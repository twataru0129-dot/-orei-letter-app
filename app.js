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

  var letterPagesContainer = $("letter-pages");

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

  /* ---------------- 清書便箋のレイアウト ----------------
     縦罫線は「15列」固定、1列はおよそ25文字。列数や文字サイズを
     内容量から逆算するのではなく、A4の紙面から一度だけ決まる固定
     値とし（styles.cssの --num-columns / --chars-per-column と
     揃えている）、文章の量が変わっても罫線の位置・文字サイズは
     変化しない。15列に収まりきらない分は、同じレイアウトのまま
     2枚目以降の便箋へ自動的に送る。 */

  var NUM_COLUMNS = 15;
  var CHARS_PER_COLUMN = 25;
  var MAX_PAGES = 6; // 暴走防止の上限（現実的な分量なら1〜2枚で収まる）

  // 文章を1列＝最大25文字のかたまりに分割する。段落の一字下げは
  // 呼び出し側が文章の先頭に全角スペースを入れることで表現され、
  // その文字も含めて先頭のかたまりに入るので、ここでは単純に
  // 25文字ごとに区切るだけでよい。
  function chunkText(text) {
    var chars = text ? Array.from(text) : [];
    if (chars.length === 0) {
      return [""];
    }
    var chunks = [];
    for (var i = 0; i < chars.length; i += CHARS_PER_COLUMN) {
      chunks.push(chars.slice(i, i + CHARS_PER_COLUMN).join(""));
    }
    return chunks;
  }

  function buildMainSegments() {
    var jikou = state.jikouText || "";
    var item4Text = state.item4.trim();
    var item5Text = state.item5.trim();
    var musubi = state.musubiText || "";

    // 各要素が新しい段落として独立した列から始まるよう、先頭に
    // 全角スペース（一字下げ）を入れている。⑤は生徒が書いた
    // 文章をそのまま使い、前後に文章を書き足さない。
    return [
      FIXED.tougo + "　" + jikou,
      "　" + FIXED.orei,
      "　実習では、" + item4Text,
      "　" + item5Text,
      "　" + FIXED.korekara,
      "それでは、" + musubi
    ];
  }

  function buildMainChunks(segments) {
    var chunks = [];
    segments.forEach(function (seg) {
      chunkText(seg).forEach(function (c) {
        chunks.push(c);
      });
    });
    return chunks;
  }

  function buildClosingParts(dateText, schoolText, deptGradeText, nameText, recipientText) {
    return {
      keigu: chunkText(FIXED.kekkugo),
      date: chunkText(dateText),
      school: chunkText(schoolText),
      deptGrade: chunkText(deptGradeText),
      name: chunkText(nameText),
      recipient: chunkText(recipientText)
    };
  }

  function closingColumnCount(parts) {
    return (
      parts.keigu.length +
      parts.date.length +
      parts.school.length +
      parts.deptGrade.length +
      parts.name.length +
      parts.recipient.length
    );
  }

  // 本文の列を、15列ずつのページに割り振る。敬具・日付・学校名・
  // 氏名・宛名（＝結びの情報）は必ず最後のページにまとめて置き、
  // 途中のページには表示しない。単純な総文字数ではなく、実際に
  // 必要な列数から自動的にページ数を判定する。
  function paginate(mainChunks, closingColumns) {
    var pages = [];
    var idx = 0;
    var total = mainChunks.length;

    while (idx < total && pages.length < MAX_PAGES) {
      var remaining = total - idx;
      var take;
      var hasClosing;
      if (remaining + closingColumns <= NUM_COLUMNS) {
        take = remaining;
        hasClosing = true;
      } else {
        take = Math.min(NUM_COLUMNS, remaining);
        hasClosing = false;
      }
      pages.push({ mainChunks: mainChunks.slice(idx, idx + take), hasClosing: hasClosing });
      idx += take;
    }

    if (pages.length === 0) {
      pages.push({ mainChunks: [], hasClosing: true });
    } else if (!pages[pages.length - 1].hasClosing) {
      if (pages.length < MAX_PAGES) {
        pages.push({ mainChunks: [], hasClosing: true });
      } else {
        // ページ上限に達した場合でも、結びの情報は省略せず最終
        // ページに含める（この場合のみ、その列だけ収まりが
        // きつくなる可能性がある）。
        pages[pages.length - 1].hasClosing = true;
      }
    }

    return { pages: pages, truncated: idx < total };
  }

  function createLetterPage() {
    var page = document.createElement("div");
    page.className = "letter-page";

    var rules = document.createElement("div");
    rules.className = "letter-rules";
    rules.setAttribute("aria-hidden", "true");
    page.appendChild(rules);

    var content = document.createElement("div");
    content.className = "letter-content";
    page.appendChild(content);

    return { page: page, content: content };
  }

  function appendChunkedColumn(parent, className, chunks) {
    var el = document.createElement("div");
    el.className = className;
    chunks.forEach(function (chunk, i) {
      if (i > 0) {
        el.appendChild(document.createElement("br"));
      }
      el.appendChild(document.createTextNode(chunk));
    });
    parent.appendChild(el);
    return el;
  }

  function buildPageElement(pageDesc, closingParts) {
    var built = createLetterPage();

    if (pageDesc.mainChunks.length > 0) {
      appendChunkedColumn(built.content, "letter-main", pageDesc.mainChunks);
    }

    if (pageDesc.hasClosing) {
      appendChunkedColumn(built.content, "letter-closing", closingParts.keigu);
      appendChunkedColumn(built.content, "letter-date", closingParts.date);

      var sender = document.createElement("div");
      sender.className = "letter-sender";
      appendChunkedColumn(sender, "letter-school", closingParts.school);
      appendChunkedColumn(sender, "letter-dept-grade", closingParts.deptGrade);
      appendChunkedColumn(sender, "letter-name", closingParts.name);
      built.content.appendChild(sender);

      appendChunkedColumn(built.content, "letter-recipient", closingParts.recipient);
    }

    return built.page;
  }

  function renderLetter() {
    var mainSegments = buildMainSegments();
    var mainChunks = buildMainChunks(mainSegments);

    var dateText = reiwaKanjiDate(state.date);
    var schoolText = "さいたま桜高等学園";
    var gradeKanji = numberToKanji(Number(state.grade) || 1) + "年";
    var deptGradeText = "家政技術科" + gradeKanji;
    var nameText = state.name.trim();
    var companyText = state.company.trim();
    var recipientText = companyText ? companyText + "　御中" : "";

    var closingParts = buildClosingParts(dateText, schoolText, deptGradeText, nameText, recipientText);
    var closingColumns = closingColumnCount(closingParts);

    var result = paginate(mainChunks, closingColumns);

    letterPagesContainer.innerHTML = "";
    result.pages.forEach(function (pageDesc, i) {
      var block = document.createElement("div");
      block.className = "page-block";

      if (result.pages.length > 1) {
        var label = document.createElement("p");
        label.className = "page-label no-print";
        label.textContent = (i + 1) + "枚目 ／ 全" + result.pages.length + "枚";
        block.appendChild(label);
      }

      block.appendChild(buildPageElement(pageDesc, closingParts));
      letterPagesContainer.appendChild(block);
    });

    fitWarning.hidden = !result.truncated;

    checkFit();
  }

  function checkFit() {
    window.requestAnimationFrame(function () {
      if (!paperWrap || !letterPagesContainer) {
        return;
      }
      // 便箋はA4の実寸幅で表示しているため、スマートフォンなど
      // 画面が狭い端末では横スクロールが必要になる。これは内容が
      // はみ出しているのではなく、単に画面が便箋より狭いだけなので
      // fit-warning ではなく案内（scroll-hint）で知らせる。
      var needsScroll = letterPagesContainer.scrollWidth > paperWrap.clientWidth + 2;
      scrollHint.hidden = !needsScroll;
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
