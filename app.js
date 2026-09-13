/* ==========================================================
   お礼状作成サポート - app.js
   個人情報はメモリ上のみで扱い、サーバーやストレージへは
   一切保存・送信しません（外部通信を行うコードはありません）。
   ========================================================== */

(function () {
  "use strict";

  /* ---------------- 固定の文章データ（変更禁止） ---------------- */

  var JIKOU = {
    1: {
      first: "新しい年を迎えましたが、皆様お元気でお過ごしでしょうか。",
      second: "寒さの厳しい日が続いていますが、皆様お変わりなくお過ごしでしょうか。"
    },
    2: {
      first: "暦の上では春となりましたが、皆様お元気でお過ごしでしょうか。",
      second: "まだ寒い日が続いていますが、皆様お変わりなくお過ごしでしょうか。"
    },
    3: {
      first: "少しずつ春の暖かさを感じる季節となりましたが、皆様お元気でしょうか。",
      second: "春らしい暖かな日が増えてきましたが、皆様お変わりなくお過ごしでしょうか。"
    },
    4: {
      first: "桜の美しい季節となりましたが、皆様お元気でお過ごしでしょうか。",
      second: "暖かく過ごしやすい季節となりましたが、皆様お変わりなくお過ごしでしょうか。"
    },
    5: {
      first: "新緑が美しい季節となりましたが、皆様お元気でお過ごしでしょうか。",
      second: "さわやかな風が心地よい季節となりましたが、皆様お変わりなくお過ごしでしょうか。"
    },
    6: {
      first: "だんだん暑さを感じる季節となりましたが、皆様お元気でお過ごしでしょうか。",
      second: "雨の日が多い季節となりましたが、皆様お変わりなくお過ごしでしょうか。"
    },
    7: {
      first: "暑い日が続くようになりましたが、皆様お元気でお過ごしでしょうか。",
      second: "夏の暑さが厳しくなってきましたが、皆様お変わりなくお過ごしでしょうか。"
    },
    8: {
      first: "暑い日が続いていますが、皆様お元気でお過ごしでしょうか。",
      second: "まだ暑さの残る毎日ですが、皆様お変わりなくお過ごしでしょうか。"
    },
    9: {
      first: "少しずつ秋の気配を感じる季節となりましたが、皆様お元気でしょうか。",
      second: "秋風が心地よい季節となりましたが、皆様お変わりなくお過ごしでしょうか。"
    },
    10: {
      first: "涼しく過ごしやすい季節となりましたが、皆様お元気でお過ごしでしょうか。",
      second: "木々の葉も色づき始めましたが、皆様お変わりなくお過ごしでしょうか。"
    },
    11: {
      first: "秋も深まり、朝晩は冷え込むようになりましたが、皆様お元気でしょうか。",
      second: "寒さを感じる日が増えてきましたが、皆様お変わりなくお過ごしでしょうか。"
    },
    12: {
      first: "冬の寒さが感じられる季節となりましたが、皆様お元気でお過ごしでしょうか。",
      second: "今年も残りわずかとなりましたが、皆様お変わりなくお過ごしでしょうか。"
    }
  };

  var MUSUBI = {
    1: {
      first: "寒い日が続きますので、どうぞお体に気をつけてお過ごしください。",
      second: "厳しい寒さが続きますが、どうぞお元気でお過ごしください。"
    },
    2: {
      first: "まだ寒い日が続きますので、どうぞお体を大切にしてください。",
      second: "春が待ち遠しい季節ですが、どうぞお元気でお過ごしください。"
    },
    3: {
      first: "季節の変わり目ですので、どうぞお体に気をつけてお過ごしください。",
      second: "春を感じる季節となりました。どうぞお元気でお過ごしください。"
    },
    4: {
      first: "新しい季節を迎え、皆様のご健康をお祈りしています。",
      second: "暖かな日が続きます。どうぞ健やかにお過ごしください。"
    },
    5: {
      first: "さわやかな季節となりました。どうぞお元気でお過ごしください。",
      second: "過ごしやすい季節ですが、どうぞお体を大切にお過ごしください。"
    },
    6: {
      first: "季節の変わり目ですので、どうぞお体に気をつけてお過ごしください。",
      second: "雨の日が続きますが、どうぞお元気でお過ごしください。"
    },
    7: {
      first: "暑い日が続きますので、どうぞお体に気をつけてお過ごしください。",
      second: "暑さの厳しい季節です。どうぞお体を大切にしてください。"
    },
    8: {
      first: "暑い日が続きますので、どうぞお元気でお過ごしください。",
      second: "まだ暑さが続きますので、どうぞお体に気をつけてお過ごしください。"
    },
    9: {
      first: "季節の変わり目ですので、どうぞお体を大切にしてください。",
      second: "過ごしやすい季節となりました。どうぞお元気でお過ごしください。"
    },
    10: {
      first: "朝晩は涼しくなってきましたので、どうぞお体に気をつけてお過ごしください。",
      second: "秋も深まってきました。どうぞお元気でお過ごしください。"
    },
    11: {
      first: "寒くなってきましたので、どうぞお体を大切にしてください。",
      second: "寒さが増してきましたが、どうぞお元気でお過ごしください。"
    },
    12: {
      first: "寒い日が続きますので、どうぞお体に気をつけてお過ごしください。",
      second: "寒さの厳しい季節ですが、どうぞよい年をお迎えください。"
    }
  };

  var FIXED = {
    tougo: "拝啓",
    orei: "先日は、現場実習で大変お世話になり、ありがとうございました。",
    korekara: "今回学んだことを、これからの学校生活にも生かしていきたいと思います。",
    kekkugo: "敬具"
  };

  /* ---------------- アプリの状態（メモリ上のみ／保存しない） ---------------- */

  var state = {
    jikouMonth: "",
    jikouPart: "", // "first" | "second"
    jikouText: "",
    item4: "",
    item5: "",
    musubiMonth: "",
    musubiPart: "",
    musubiText: "",
    company: "",
    date: "",
    grade: "1",
    name: ""
  };

  /* ---------------- 要素取得 ---------------- */

  var $ = function (id) { return document.getElementById(id); };

  var monthSelect2 = $("month-select-2");
  var monthSelect7 = $("month-select-7");
  var cards2 = $("cards-2");
  var cards7 = $("cards-7");
  var preview2 = $("selected-preview-2");
  var preview7 = $("selected-preview-7");
  var input4 = $("input-4");
  var input5 = $("input-5");
  var completeBtn = $("complete-btn");
  var errorBox = $("error-box");

  var inputCompany = $("input-company");
  var inputDate = $("input-date");
  var inputGrade = $("input-grade");
  var inputName = $("input-name");
  var backBtn = $("back-btn");
  var printBtn = $("print-btn");
  var fitWarning = $("fit-warning");
  var scrollHint = $("scroll-hint");
  var paperWrap = $("paper-wrap");

  var letterMain = $("letter-main");
  var letterDate = $("letter-date");
  var letterDeptGrade = $("letter-dept-grade");
  var letterName = $("letter-name");
  var letterRecipient = $("letter-recipient");
  var letterPage = $("letter-page");

  var step1 = $("step-1");
  var step2 = $("step-2");

  /* ---------------- 月選択の初期化 ---------------- */

  function fillMonthOptions(selectEl) {
    var placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "月を選んでください";
    selectEl.appendChild(placeholder);
    for (var m = 1; m <= 12; m++) {
      var opt = document.createElement("option");
      opt.value = String(m);
      opt.textContent = m + "月";
      selectEl.appendChild(opt);
    }
  }

  fillMonthOptions(monthSelect2);
  fillMonthOptions(monthSelect7);

  /* ---------------- カード（前半・後半）の描画 ---------------- */

  function renderCards(container, dataSet, month, selectedPart, onSelect) {
    container.innerHTML = "";
    if (!month) {
      return;
    }
    var entry = dataSet[Number(month)];
    var parts = [
      { key: "first", label: "前半", text: entry.first },
      { key: "second", label: "後半", text: entry.second }
    ];
    parts.forEach(function (p) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "greeting-card" + (selectedPart === p.key ? " selected" : "");
      btn.setAttribute("aria-pressed", selectedPart === p.key ? "true" : "false");

      var badge = document.createElement("span");
      badge.className = "greeting-card-part";
      badge.textContent = p.label;

      var text = document.createElement("span");
      text.className = "greeting-card-text";
      text.textContent = p.text;

      btn.appendChild(badge);
      btn.appendChild(document.createElement("br"));
      btn.appendChild(text);

      btn.addEventListener("click", function () {
        onSelect(p.key, p.text);
      });

      container.appendChild(btn);
    });
  }

  function renderCards2() {
    renderCards(cards2, JIKOU, state.jikouMonth, state.jikouPart, function (part, text) {
      state.jikouPart = part;
      state.jikouText = text;
      renderCards2();
      preview2.textContent = "選択中：" + text;
    });
  }

  function renderCards7() {
    renderCards(cards7, MUSUBI, state.musubiMonth, state.musubiPart, function (part, text) {
      state.musubiPart = part;
      state.musubiText = text;
      renderCards7();
      preview7.textContent = "選択中：" + text;
    });
  }

  monthSelect2.addEventListener("change", function () {
    state.jikouMonth = monthSelect2.value;
    state.jikouPart = "";
    state.jikouText = "";
    preview2.textContent = "";
    renderCards2();
  });

  monthSelect7.addEventListener("change", function () {
    state.musubiMonth = monthSelect7.value;
    state.musubiPart = "";
    state.musubiText = "";
    preview7.textContent = "";
    renderCards7();
  });

  input4.addEventListener("input", function () {
    state.item4 = input4.value;
  });

  input5.addEventListener("input", function () {
    state.item5 = input5.value;
  });

  /* ---------------- 作成完了チェック ---------------- */

  function showErrors(messages) {
    errorBox.innerHTML = "";
    var title = document.createElement("p");
    title.textContent = "もう少しで完成です。次のところを確認してください。";
    errorBox.appendChild(title);
    var ul = document.createElement("ul");
    messages.forEach(function (msg) {
      var li = document.createElement("li");
      li.textContent = msg;
      ul.appendChild(li);
    });
    errorBox.appendChild(ul);
    errorBox.hidden = false;
  }

  function hideErrors() {
    errorBox.hidden = true;
    errorBox.innerHTML = "";
  }

  completeBtn.addEventListener("click", function () {
    var missing = [];

    if (!state.jikouText) {
      missing.push("② 時候の挨拶が選ばれていません。月を選んで、文章をタップしましょう。");
    }
    if (!state.item4.trim()) {
      missing.push("④ 具体的な出来事がまだ書かれていません。実習の内容を書きましょう。");
    }
    if (!state.item5.trim()) {
      missing.push("⑤ 心に残ったこと／学んだことがまだ書かれていません。");
    }
    if (!state.musubiText) {
      missing.push("⑦ 結びの挨拶が選ばれていません。月を選んで、文章をタップしましょう。");
    }

    if (missing.length > 0) {
      showErrors(missing);
      errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    hideErrors();
    goToScreen(2);
  });

  /* ---------------- 画面切り替え ---------------- */

  function goToScreen(num) {
    document.body.setAttribute("data-screen", String(num));

    if (num === 1) {
      step1.classList.add("current");
      step1.classList.remove("done");
      step2.classList.remove("current");
      step2.classList.remove("done");
    } else {
      step1.classList.remove("current");
      step1.classList.add("done");
      step2.classList.add("current");
      step2.classList.remove("done");
      if (!inputDate.value) {
        inputDate.value = todayISO();
      }
      renderLetter();
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  backBtn.addEventListener("click", function () {
    goToScreen(1);
  });

  printBtn.addEventListener("click", function () {
    window.print();
  });

  /* ---------------- 清書フォームの入力 ---------------- */

  function todayISO() {
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  inputCompany.addEventListener("input", function () {
    state.company = inputCompany.value;
    renderLetter();
  });

  inputDate.addEventListener("input", function () {
    state.date = inputDate.value;
    renderLetter();
  });

  inputGrade.addEventListener("change", function () {
    state.grade = inputGrade.value;
    renderLetter();
  });

  inputName.addEventListener("input", function () {
    state.name = inputName.value;
    renderLetter();
  });

  /* ---------------- 令和変換（漢数字） ---------------- */

  var KANJI_DIGITS = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  var KANJI_UNITS = ["", "十", "百", "千"];

  // 単純な数字の置き換えではなく、「十二」「二十一」のような
  // 日本語として自然な漢数字表記に変換する（1〜9999程度を想定）。
  function numberToKanji(num) {
    if (num === 0) {
      return "〇";
    }
    var s = String(num);
    var len = s.length;
    var result = "";
    for (var i = 0; i < len; i++) {
      var d = Number(s[i]);
      var unitIndex = len - i - 1;
      if (d === 0) {
        continue;
      }
      if (d === 1 && unitIndex > 0) {
        // 「一十」ではなく「十」、「一百」ではなく「百」とする
        result += KANJI_UNITS[unitIndex];
      } else {
        result += KANJI_DIGITS[d] + KANJI_UNITS[unitIndex];
      }
    }
    return result;
  }

  function reiwaKanjiDate(isoDateStr) {
    if (!isoDateStr) {
      return "";
    }
    var parts = isoDateStr.split("-");
    if (parts.length !== 3) {
      return "";
    }
    var year = Number(parts[0]);
    var month = Number(parts[1]);
    var day = Number(parts[2]);
    if (!year || !month || !day) {
      return "";
    }

    var reiwaStart = new Date(2019, 4, 1); // 2019-05-01
    var target = new Date(year, month - 1, day);

    var yearText;
    if (target.getTime() >= reiwaStart.getTime()) {
      var reiwaYear = year - 2018;
      yearText = "令和" + (reiwaYear === 1 ? "元" : numberToKanji(reiwaYear)) + "年";
    } else {
      // 令和より前の日付が選ばれた場合の保険（通常は発生しない）
      yearText = numberToKanji(year) + "年";
    }

    return yearText + numberToKanji(month) + "月" + numberToKanji(day) + "日";
  }

  /* ---------------- 清書便箋のレイアウト計算 ----------------
     A4の紙面に、1列およそ20〜25文字の縦書き便箋らしい列で
     文章を配置するため、内容の文字数から列数を見積もり、
     紙面の横幅に収まるように文字サイズ（＝列の間隔）を
     自動調整する。最小文字サイズは下回らない。 */

  var LAYOUT = {
    charsPerColumn: 24, // 1列あたりの目安文字数（20〜25の範囲）
    pitchFactor: 1.7, // 列の間隔 = 文字サイズ × この倍率
    heightBuffer: 1.08, // 1列の高さ = 文字サイズ × 文字数 × この倍率
    fontMaxMm: 7.5, // 文字サイズの上限
    fontMinMm: 4.8, // 文字サイズの下限（これより小さくしない）
    pageMarginMm: 14, // 印刷時に切れない安全余白
    pageWidthMm: 210,
    gapBeforeClosing: 0.5, // 敬具の前の空き（列の間隔の倍数）
    gapBeforeDateGroup: 1.2, // 日付ブロックの前の空き
    gapBeforeRecipient: 1.0 // 宛名の前の空き
  };

  function columnsFor(text) {
    var len = text ? Array.from(text).length : 0;
    return Math.max(1, Math.ceil(len / LAYOUT.charsPerColumn));
  }

  function buildMainSegments() {
    var jikou = state.jikouText || "";
    var item4Text = state.item4.trim();
    var item5Text = state.item5.trim();
    var musubi = state.musubiText || "";

    return [
      FIXED.tougo + "　" + jikou,
      "　" + FIXED.orei,
      "　実習では、" + item4Text,
      "　今回の実習を通して、" + item5Text + "ことを学びました。",
      "　" + FIXED.korekara,
      "それでは、" + musubi
    ];
  }

  function appendLine(container, text) {
    if (container.childNodes.length > 0) {
      container.appendChild(document.createElement("br"));
    }
    container.appendChild(document.createTextNode(text));
  }

  function renderLetterMain(segments) {
    letterMain.innerHTML = "";
    segments.forEach(function (seg) {
      appendLine(letterMain, seg);
    });
  }

  function applyLayout(mainSegments, dateText, schoolText, deptGradeText, nameText, recipientText) {
    var mainColumns = mainSegments.reduce(function (sum, seg) {
      return sum + columnsFor(seg);
    }, 0);

    var totalUnits =
      mainColumns +
      LAYOUT.gapBeforeClosing +
      columnsFor(FIXED.kekkugo) +
      LAYOUT.gapBeforeDateGroup +
      columnsFor(dateText) +
      columnsFor(schoolText) +
      columnsFor(deptGradeText) +
      columnsFor(nameText || "　") +
      LAYOUT.gapBeforeRecipient +
      columnsFor(recipientText || "　");

    var usableWidthMm = LAYOUT.pageWidthMm - LAYOUT.pageMarginMm * 2;
    var fontSizeMm = usableWidthMm / (totalUnits * LAYOUT.pitchFactor);
    fontSizeMm = Math.max(LAYOUT.fontMinMm, Math.min(LAYOUT.fontMaxMm, fontSizeMm));

    var pitchMm = fontSizeMm * LAYOUT.pitchFactor;
    var colHeightMm = fontSizeMm * LAYOUT.charsPerColumn * LAYOUT.heightBuffer;

    letterPage.style.setProperty("--col-font-size", fontSizeMm.toFixed(2) + "mm");
    letterPage.style.setProperty("--col-pitch", pitchMm.toFixed(2) + "mm");
    letterPage.style.setProperty("--col-height", colHeightMm.toFixed(2) + "mm");
    letterPage.style.setProperty("--page-margin", LAYOUT.pageMarginMm + "mm");
  }

  function renderLetter() {
    var mainSegments = buildMainSegments();
    var dateText = reiwaKanjiDate(state.date);
    var schoolText = "さいたま桜高等学園";
    var deptGradeText = "家政技術科" + state.grade + "年";
    var nameText = state.name.trim();
    var companyText = state.company.trim();
    var recipientText = companyText ? companyText + "　御中" : "";

    applyLayout(mainSegments, dateText, schoolText, deptGradeText, nameText, recipientText);

    renderLetterMain(mainSegments);

    letterDate.textContent = dateText;
    letterDeptGrade.textContent = deptGradeText;
    letterName.textContent = nameText;
    letterRecipient.textContent = recipientText;

    checkFit();
  }

  function checkFit() {
    window.requestAnimationFrame(function () {
      if (!letterPage) {
        return;
      }
      // letterPage has a fixed physical width (A4). Compare its own
      // scrollWidth against its own clientWidth so a narrow phone screen
      // (which just needs horizontal scrolling to view the page) is never
      // mistaken for text that doesn't fit on the printed page itself.
      var overflowing = letterPage.scrollWidth > letterPage.clientWidth + 2;
      fitWarning.hidden = !overflowing;

      // The letter-page has a fixed A4 width, so on a narrow phone screen
      // the preview box itself needs horizontal scrolling even when the
      // text fits the page perfectly. Let students know they can scroll.
      if (paperWrap) {
        var needsScroll = letterPage.scrollWidth > paperWrap.clientWidth + 2;
        scrollHint.hidden = !needsScroll;
      }
    });
  }

  window.addEventListener("resize", function () {
    if (document.body.getAttribute("data-screen") === "2") {
      checkFit();
    }
  });

  /* ---------------- 初期化 ---------------- */

  inputDate.value = todayISO();
  state.date = inputDate.value;
  goToScreen(1);
})();
