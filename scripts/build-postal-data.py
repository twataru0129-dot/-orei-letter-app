#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
日本郵便が公式に公開している郵便番号データ（KEN_ALL / JIGYOSYO）から、
アプリ用の検索データ（postal-data.json）を作成する開発・データ更新用の
スクリプトです。アプリの実行時にはこのスクリプトは使いません。

使い方や、元データの入手先はリポジトリ直下の README.md
「郵便番号データの更新方法」を参照してください。

  python3 scripts/build-postal-data.py \
    --ken-all scripts/source-data/utf_ken_all.csv \
    --jigyosyo scripts/source-data/JIGYOSYO.CSV \
    --out postal-data.json
"""

import argparse
import csv
import json
import sys


# KEN_ALL（住所の郵便番号）で、確定した町域名がない代表行に使われる
# 表記。この文字列は生徒の住所欄にそのまま入れず、都道府県＋市区町村
# までにとどめる。
KEN_ALL_NO_TOWN_LABEL = "以下に掲載がない場合"


def read_ken_all(path):
    """KEN_ALL（UTF-8版）を読み込み、郵便番号ごとの住所候補を返す。"""
    entries = {}
    with open(path, encoding="utf-8-sig", newline="") as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) < 9:
                continue
            postal_code = row[2].strip()
            pref = row[6].strip()
            city = row[7].strip()
            town = row[8].strip()

            if not (len(postal_code) == 7 and postal_code.isdigit()):
                continue

            if town == KEN_ALL_NO_TOWN_LABEL:
                address = pref + city
            else:
                address = pref + city + town

            bucket = entries.setdefault(postal_code, [])
            candidate = {"type": "normal", "address": address}
            if candidate not in bucket:
                bucket.append(candidate)
    return entries


def read_jigyosyo(path):
    """事業所の個別郵便番号（Shift-JIS/CP932）を読み込み、
    郵便番号ごとの事業所候補を返す。廃止（修正コード5）の行は除く。"""
    entries = {}
    with open(path, encoding="cp932", newline="") as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) < 13:
                continue
            company = row[2].strip()
            pref = row[3].strip()
            city = row[4].strip()
            town = row[5].strip()
            block = row[6].strip()
            postal_code = row[7].strip()
            fix_code = row[12].strip()

            if not (len(postal_code) == 7 and postal_code.isdigit()):
                continue
            if fix_code == "5":  # 廃止
                continue

            address = pref + city + town + block
            bucket = entries.setdefault(postal_code, [])
            candidate = {"type": "office", "company": company, "address": address}
            if candidate not in bucket:
                bucket.append(candidate)
    return entries


def merge(ken_all_entries, jigyosyo_entries):
    merged = {}
    for postal_code, candidates in ken_all_entries.items():
        merged.setdefault(postal_code, []).extend(candidates)
    for postal_code, candidates in jigyosyo_entries.items():
        merged.setdefault(postal_code, []).extend(candidates)
    return merged


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ken-all", required=True, help="utf_ken_all.csv のパス")
    parser.add_argument("--jigyosyo", required=True, help="JIGYOSYO.CSV のパス")
    parser.add_argument("--out", default="postal-data.json", help="出力先のJSONパス")
    args = parser.parse_args()

    print("KEN_ALL（住所の郵便番号）を読み込んでいます…", file=sys.stderr)
    ken_all_entries = read_ken_all(args.ken_all)
    print("  郵便番号数: {}".format(len(ken_all_entries)), file=sys.stderr)

    print("JIGYOSYO（事業所の個別郵便番号）を読み込んでいます…", file=sys.stderr)
    jigyosyo_entries = read_jigyosyo(args.jigyosyo)
    print("  郵便番号数: {}".format(len(jigyosyo_entries)), file=sys.stderr)

    merged = merge(ken_all_entries, jigyosyo_entries)
    print("マージ後の郵便番号数: {}".format(len(merged)), file=sys.stderr)

    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(merged, f, ensure_ascii=False, separators=(",", ":"), sort_keys=True)

    print("書き出しました: {}".format(args.out), file=sys.stderr)


if __name__ == "__main__":
    main()
