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
    name: "",
    envelopePostal: "",
    envelopeAddress: "",
    envelopeContact: ""
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
  var saveBtn = $("save-btn");
  var saveGuideModal = $("save-guide-modal");
  var saveGuideBody = $("save-guide-body");
  var saveGuideCancelBtn = $("save-guide-cancel-btn");
  var saveGuideActionBtn = $("save-guide-action-btn");
  var saveErrorBox = $("save-error-box");
  var saveErrorText = $("save-error-text");
  var imagePreviewModal = $("image-preview-modal");
  var imagePreviewList = $("image-preview-list");
  var imagePreviewCloseBtn = $("image-preview-close-btn");
  var fitWarning = $("fit-warning");
  var scrollHint = $("scroll-hint");
  var paperWrap = $("paper-wrap");

  var letterPagesContainer = $("letter-pages");

  var step1 = $("step-1");
  var step2 = $("step-2");
  var step3 = $("step-3");

  var gotoEnvelopeBtn = $("goto-envelope-btn");
  var envelopeCarryCompany = $("envelope-carry-company");
  var envelopeCarryName = $("envelope-carry-name");
  var inputEnvelopePostal = $("input-envelope-postal");
  var inputEnvelopeAddress = $("input-envelope-address");
  var inputEnvelopeContact = $("input-envelope-contact");
  var envelopeErrorBox = $("envelope-error-box");
  var envelopeErrorText = $("envelope-error-text");
  var envelopeCanvas = $("envelope-canvas");
  var envelopePreviewCanvas = $("envelope-preview-canvas");
  var envelopeTabFront = $("envelope-tab-front");
  var envelopeTabBack = $("envelope-tab-back");
  var envelopeBackBtn = $("envelope-back-btn");
  var envelopeSaveBtn = $("envelope-save-btn");
  var envelopePrintBtn = $("envelope-print-btn");
  var dynamicPageStyle = $("dynamic-page-style");

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

    step1.classList.remove("current", "done");
    step2.classList.remove("current", "done");
    step3.classList.remove("current", "done");

    if (num === 1) {
      step1.classList.add("current");
    } else if (num === 2) {
      step1.classList.add("done");
      step2.classList.add("current");
      if (!inputDate.value) {
        inputDate.value = todayISO();
      }
      renderLetter();
    } else {
      step1.classList.add("done");
      step2.classList.add("done");
      step3.classList.add("current");
      renderEnvelope();
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  backBtn.addEventListener("click", function () {
    goToScreen(1);
  });

  gotoEnvelopeBtn.addEventListener("click", function () {
    var companyMissing = !state.company.trim();
    var nameMissing = !state.name.trim();

    if (companyMissing && nameMissing) {
      showSaveError("封筒を作るために、実習先の会社名と名前を入力してください。");
      inputCompany.focus();
      return;
    }
    if (companyMissing) {
      showSaveError("封筒を作るために、実習先の会社名を入力してください。");
      inputCompany.focus();
      return;
    }
    if (nameMissing) {
      showSaveError("封筒を作るために、名前を入力してください。");
      inputName.focus();
      return;
    }
    hideSaveError();
    goToScreen(3);
  });

  envelopeBackBtn.addEventListener("click", function () {
    goToScreen(2);
  });

  printBtn.addEventListener("click", function () {
    if (!requireCompanyOrShowError()) {
      return;
    }
    dynamicPageStyle.textContent = "";
    window.print();
  });

  /* ---------------- 保存（画像）の案内モーダル ----------------
     Windows・Mac・iPhone・iPadのすべてで、保存方法を「画像で保存」
     （便箋のページをPNG画像として保存する）に統一している。以前は
     PC側だけ「PDFで保存」（window.print()）を使っていたが、
     MacBook・iPhone・iPadではSafariの印刷・PDF化でページ数が
     増えたり黒背景になったりする問題があり、PC側でも保存結果が
     不安定だったため、全端末で同じ画像保存方式に一本化した。
     端末によって変えるのは保存の「受け渡し方」だけ：iPhone/iPad
     ではWeb Share APIで共有シートを開き、PC/Macなどでは画像を
     自動ダウンロードしたうえで、保存用のプレビューも表示する
     （detectDeviceKindはこの受け渡し方の切り替えにのみ使う）。 */

  function detectDeviceKind() {
    try {
      var ua = navigator.userAgent || "";
      var platform = navigator.platform || "";
      // iPadOS 13以降はSafari上でMacと同じUserAgentを名乗るため、
      // タッチ対応のMacIntelもiPadとして扱う。
      var isIPadOS = platform === "MacIntel" && typeof navigator.maxTouchPoints === "number" && navigator.maxTouchPoints > 1;
      if (/iPad|iPhone|iPod/.test(ua) || isIPadOS) {
        return "ios";
      }
      if (/Windows/.test(ua)) {
        return "windows";
      }
    } catch (e) {
      // 判定に失敗しても「その他」の案内にフォールバックする。
    }
    return "other";
  }

  var deviceKind = detectDeviceKind();

  // モーダルの案内文・実行内容は「便箋」「封筒」のどちらから開いたかで
  // 変わるため、直前にどちらのボタンが押されたかをここに覚えておく。
  var pendingSaveKind = "letter";

  function saveGuideTextFor(kind) {
    var subject = kind === "envelope" ? "封筒の見本" : "便箋";
    if (deviceKind === "ios") {
      var iosText =
        subject + "を画像にして保存します。\n\n" +
        "このあと共有画面が開きます。\n\n" +
        "「画像を保存」または「”ファイル”に保存」を選んでください。";
      if (kind === "letter") {
        iosText += "\n\nページが2枚以上ある場合は、ページごとに画像が用意されます。";
      }
      return iosText;
    }
    var otherText =
      subject + "を画像ファイルとして保存します。\n\n" +
      "このあと画像のダウンロードが始まります。\n\n";
    if (kind === "letter") {
      otherText += "ページが2枚以上ある場合は、ページごとに画像が保存されます。\n\n";
    }
    otherText += "うまく保存できない場合は、続けて表示される画像の一覧からも保存できます。";
    return otherText;
  }

  function openSaveGuideModalFor(kind, requiredCheckFn) {
    if (requiredCheckFn && !requiredCheckFn()) {
      return;
    }
    pendingSaveKind = kind;
    saveGuideBody.textContent = saveGuideTextFor(kind);
    saveGuideModal.hidden = false;
    saveGuideActionBtn.focus();
  }

  function closeSaveGuideModal() {
    saveGuideModal.hidden = true;
    (pendingSaveKind === "envelope" ? envelopeSaveBtn : saveBtn).focus();
  }

  saveBtn.addEventListener("click", function () {
    openSaveGuideModalFor("letter", requireCompanyOrShowError);
  });

  envelopeSaveBtn.addEventListener("click", function () {
    openSaveGuideModalFor("envelope", requireEnvelopeFieldsOrShowError);
  });

  saveGuideCancelBtn.addEventListener("click", closeSaveGuideModal);

  saveGuideModal.addEventListener("click", function (e) {
    if (e.target === saveGuideModal) {
      closeSaveGuideModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") {
      return;
    }
    if (!saveGuideModal.hidden) {
      closeSaveGuideModal();
    }
    if (!imagePreviewModal.hidden) {
      closeImagePreview();
    }
  });

  saveGuideActionBtn.addEventListener("click", function () {
    var kind = pendingSaveKind;
    closeSaveGuideModal();
    if (kind === "envelope") {
      saveEnvelopeAsImage();
    } else {
      saveAsImages();
    }
  });

  /* ---------------- 保存エラーの表示 ---------------- */

  function showSaveError(message) {
    saveErrorText.textContent = message;
    saveErrorBox.hidden = false;
    saveErrorBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function hideSaveError() {
    saveErrorBox.hidden = true;
  }

  /* ---------------- 実習先の会社名（必須）のチェック ----------------
     清書画面には「実習先の会社名 必須」と表示されているが、これまで
     会社名が空欄でも画像保存・印刷ができてしまっていた。「画像で
     保存」「印刷する」のどちらも、押した時点で会社名が空欄なら
     実行せず、分かりやすいメッセージを表示する。清書の「会社名＋
     御中」の仕様（renderLetter内のrecipientText組み立て）や、
     画面1→画面2の遷移チェックには一切手を加えていない。 */

  var COMPANY_REQUIRED_MESSAGE = "実習先の会社名を入力してください。";

  function requireCompanyOrShowError() {
    if (!inputCompany.value.trim()) {
      showSaveError(COMPANY_REQUIRED_MESSAGE);
      inputCompany.focus();
      return false;
    }
    hideSaveError();
    return true;
  }

  // 会社名を入力し始めたら、表示中の「会社名が未入力」エラーは
  // すぐに解除する（画像保存の失敗など、別の理由で出ているエラーは
  // 誤って消さないよう、メッセージが一致する場合のみ消す）。
  inputCompany.addEventListener("input", function () {
    if (!saveErrorBox.hidden && saveErrorText.textContent === COMPANY_REQUIRED_MESSAGE && inputCompany.value.trim()) {
      hideSaveError();
    }
  });

  /* ---------------- 封筒（画面3）のエラー表示・必須チェック ----------------
     画面3は画面2とは別のセクションなので、エラー表示も専用の
     #envelope-error-box を使う（画面2の#save-error-boxは画面3が
     表示されている間は非表示のDOMに隠れてしまうため）。 */

  function showEnvelopeError(message) {
    envelopeErrorText.textContent = message;
    envelopeErrorBox.hidden = false;
    envelopeErrorBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function hideEnvelopeError() {
    envelopeErrorBox.hidden = true;
  }

  var ENVELOPE_POSTAL_REQUIRED_MESSAGE = "実習先の郵便番号を入力してください。";
  var ENVELOPE_ADDRESS_REQUIRED_MESSAGE = "実習先の住所を入力してください。";

  function requireEnvelopeFieldsOrShowError() {
    if (!inputEnvelopePostal.value.trim()) {
      showEnvelopeError(ENVELOPE_POSTAL_REQUIRED_MESSAGE);
      inputEnvelopePostal.focus();
      return false;
    }
    if (!inputEnvelopeAddress.value.trim()) {
      showEnvelopeError(ENVELOPE_ADDRESS_REQUIRED_MESSAGE);
      inputEnvelopeAddress.focus();
      return false;
    }
    hideEnvelopeError();
    return true;
  }

  function clearEnvelopeErrorIfMatches(message, valueIsFilled) {
    if (!envelopeErrorBox.hidden && envelopeErrorText.textContent === message && valueIsFilled) {
      hideEnvelopeError();
    }
  }

  inputEnvelopePostal.addEventListener("input", function () {
    state.envelopePostal = inputEnvelopePostal.value;
    clearEnvelopeErrorIfMatches(ENVELOPE_POSTAL_REQUIRED_MESSAGE, !!inputEnvelopePostal.value.trim());
    renderEnvelope();
  });

  inputEnvelopeAddress.addEventListener("input", function () {
    state.envelopeAddress = inputEnvelopeAddress.value;
    clearEnvelopeErrorIfMatches(ENVELOPE_ADDRESS_REQUIRED_MESSAGE, !!inputEnvelopeAddress.value.trim());
    renderEnvelope();
  });

  inputEnvelopeContact.addEventListener("input", function () {
    state.envelopeContact = inputEnvelopeContact.value;
    renderEnvelope();
  });

  // スマホでキーボード表示中も、今どの欄を触っているか分かるよう、
  // フォーカスした入力欄が隠れないところまでスクロールする。
  [inputEnvelopePostal, inputEnvelopeAddress, inputEnvelopeContact].forEach(function (el) {
    el.addEventListener("focus", function () {
      window.setTimeout(function () {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    });
  });

  // 画面上のプレビューは「表面」「裏面」をタブで切り替えて1面ずつ
  // 大きく表示する（印刷・画像保存用のA4横1枚レイアウトとは別物）。
  function setEnvelopePreviewFace(face) {
    envelopePreviewFace = face;
    envelopeTabFront.classList.toggle("active", face === "front");
    envelopeTabFront.setAttribute("aria-selected", face === "front" ? "true" : "false");
    envelopeTabBack.classList.toggle("active", face === "back");
    envelopeTabBack.setAttribute("aria-selected", face === "back" ? "true" : "false");
    drawEnvelopeSingleFace(envelopePreviewCanvas, envelopePreviewFace, ENVELOPE_PREVIEW_SCALE);
  }

  envelopeTabFront.addEventListener("click", function () {
    setEnvelopePreviewFace("front");
  });

  envelopeTabBack.addEventListener("click", function () {
    setEnvelopePreviewFace("back");
  });

  envelopePrintBtn.addEventListener("click", function () {
    if (!requireEnvelopeFieldsOrShowError()) {
      return;
    }
    drawEnvelopeSheet(envelopeCanvas, ENVELOPE_IMAGE_SCALE);
    dynamicPageStyle.textContent = "@page { size: A4 landscape; margin: 0; }";
    window.print();
  });

  /* ---------------- 画像で保存（全端末共通） ----------------
     便箋を画像化する方法として、最初はDOMをSVGのforeignObjectで
     複製し、それをcanvasへ描画してからPNG化する方式を試したが、
     foreignObjectを含むSVG画像をcanvasへ描画すると、その内容に
     関係なくブラウザの仕様上「tainted canvas（汚染された
     キャンバス）」扱いになり、toBlob/toDataURLでの画像取得が
     どのブラウザでも一律に失敗することが分かった（これはブラウザ
     の実装差ではなく、HTML/Canvas仕様で定められた挙動）。
     そのため、DOMを画像化するのではなく、canvas上に便箋のマス目・
     縦罫線・文字を直接描画する方式に変更した。列数・1列の文字数・
     余白・フォントサイズなどは、清書のレイアウトで使っている値
     （PAGE_MARGIN_MM / NUM_COLUMNS / CHARS_PER_COLUMN /
     HEIGHT_BUFFER など、後述）とまったく同じ計算式を使うため、
     見た目は清書プレビューと同じになる。canvasへの直接描画のみを
     行うため、tainted canvasにはならず、PNGとして確実に書き出せる。
     外部ライブラリ・CDNは使用していない。 */

  var SAVE_IMAGE_SCALE = 3; // 印刷見本として使えるよう高解像度で書き出す
  var MM_TO_PX_BASE = 96 / 25.4;
  var SAVE_FONT_FAMILY =
    '"Hiragino Kaku Gothic ProN","Hiragino Sans","Yu Gothic","YuGothic","Meiryo",' +
    '"Noto Sans CJK JP","Noto Sans JP",sans-serif';

  // text-orientation: mixed の縦書きで、90度回転して縦線として
  // 表示される文字（長音符・カッコ類など）。
  var ROTATE_VERTICAL_CHARS = {
    "ー": true, "―": true, "〜": true, "～": true,
    "「": true, "」": true, "『": true, "』": true,
    "（": true, "）": true, "(": true, ")": true
  };

  // 縦書きでは、句読点はセルの中央ではなく右上寄りに描かれるのが
  // 自然な見た目になる。
  var SHIFT_PUNCT_CHARS = { "、": true, "。": true };

  // 1ページぶんの列データ（{text, className, offsetMm}の配列）から、
  // 清書プレビューと同じ見た目のcanvasを描画する。scaleは出力解像度
  // の倍率（画面の等倍を1とする）。
  function renderPageCanvas(pageChunks, scale) {
    var mmToPx = MM_TO_PX_BASE * scale;
    var pageWpx = 210 * mmToPx;
    var pageHpx = 297 * mmToPx;
    var marginPx = PAGE_MARGIN_MM * mmToPx;
    var usableWpx = pageWpx - marginPx * 2;
    var usableHpx = pageHpx - marginPx * 2;
    var rulePitchPx = usableWpx / NUM_COLUMNS; // 列の「横方向」の間隔（罫線の位置に使う）
    var fontSizePx = usableHpx / (CHARS_PER_COLUMN * HEIGHT_BUFFER);
    // 1文字ぶんの「縦方向」の間隔。writing-mode: vertical-rl では
    // CSSのline-heightは列の横幅（rule-pitch）に対応する値であり、
    // 縦方向の文字間隔はそれとは別に、列の高さを25文字で均等に
    // 割った値になる（列の最後の文字がちょうど罫線の下端に来る）。
    var charPitchPx = usableHpx / CHARS_PER_COLUMN;

    var canvas = document.createElement("canvas");
    canvas.width = Math.round(pageWpx);
    canvas.height = Math.round(pageHpx);
    var ctx = canvas.getContext("2d");

    // 白背景・黒文字を必ず使う（端末のダークモード設定に関わらず）。
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 縦罫線（15列、薄いグレー）。右端を起点に左へ向かって
    // rulePitchPxごとに16本引く（CSSのrepeating-linear-gradient
    // (to left, ...) と同じ並び方）。
    ctx.strokeStyle = "#b3b3b3";
    ctx.lineWidth = Math.max(1, Math.round(scale));
    for (var li = 0; li <= NUM_COLUMNS; li++) {
      var lx = Math.round(marginPx + usableWpx - li * rulePitchPx) + 0.5;
      ctx.beginPath();
      ctx.moveTo(lx, marginPx);
      ctx.lineTo(lx, marginPx + usableHpx);
      ctx.stroke();
    }

    // 本文（右の列から左の列へ、各列は上から下へ1文字ずつ）。
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000000";

    pageChunks.forEach(function (chunk, colIndex) {
      var centerX = marginPx + usableWpx - (colIndex + 0.5) * rulePitchPx;
      var isBold = chunk.className === "letter-recipient";
      ctx.font = (isBold ? "bold " : "") + fontSizePx + "px " + SAVE_FONT_FAMILY;

      var colTop = marginPx + (chunk.offsetMm ? chunk.offsetMm * mmToPx : 0);

      Array.from(chunk.text).forEach(function (ch, charIndex) {
        if (ch === " " || ch === "　") {
          return; // 空白文字自体は描かない（一字下げの空きマスになる）
        }
        var cellTop = colTop + charIndex * charPitchPx;
        var cellCenterY = cellTop + charPitchPx / 2;

        if (ROTATE_VERTICAL_CHARS[ch]) {
          ctx.save();
          ctx.translate(centerX, cellCenterY);
          ctx.rotate(Math.PI / 2);
          ctx.fillText(ch, 0, 0);
          ctx.restore();
        } else if (SHIFT_PUNCT_CHARS[ch]) {
          ctx.fillText(ch, centerX + fontSizePx * 0.28, cellTop + fontSizePx * 0.38);
        } else {
          ctx.fillText(ch, centerX, cellCenterY);
        }
      });
    });

    return canvas;
  }

  function canvasToPngBlob(canvas) {
    return new Promise(function (resolve, reject) {
      try {
        canvas.toBlob(function (blob) {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("canvas toBlob returned null"));
          }
        }, "image/png");
      } catch (e) {
        reject(e);
      }
    });
  }

  function buildImageFilenameBase(pageNum, totalPages) {
    var namePart = state.name.trim().replace(/\s+/g, "");
    var datePart = state.date ? state.date.replace(/-/g, "") : "";
    var base = "お礼状";
    if (datePart) {
      base += "_" + datePart;
    }
    if (namePart) {
      base += "_" + namePart;
    }
    if (totalPages > 1) {
      base += "_" + pageNum + "ページ目";
    }
    return base;
  }

  function buildPageImageFile(pageChunks, pageNum, totalPages) {
    var filenameBase = buildImageFilenameBase(pageNum, totalPages);
    var canvas = renderPageCanvas(pageChunks, SAVE_IMAGE_SCALE);
    return canvasToPngBlob(canvas).then(function (blob) {
      return new File([blob], filenameBase + ".png", { type: "image/png" });
    });
  }

  // Web Share APIで画像を共有する。複数ページをまとめて共有できる
  // 場合はまとめて、できない場合は1枚ずつ順番に共有する。
  // ユーザーが共有シートをキャンセルした場合はエラー扱いにせず、
  // 「共有は試みた（＝それ以上フォールバックのプレビューは出さない）」
  // として扱う。それ以外の失敗は呼び出し側でプレビューにフォール
  // バックする。
  function isShareCancel(err) {
    return !!err && err.name === "AbortError";
  }

  // shareMetaは { title, text, textForPage } の形で、便箋・封筒で
  // 共有時のタイトル・説明文を切り替えるために呼び出し側が渡す。
  // textForPageは複数ファイルを1枚ずつ共有するときだけ使う（省略時
  // はtextをそのまま使う）。
  function tryShareFiles(files, shareMeta) {
    if (!navigator.share || !navigator.canShare) {
      return Promise.resolve(false);
    }
    try {
      if (navigator.canShare({ files: files })) {
        return navigator.share({
          files: files,
          title: shareMeta.title,
          text: shareMeta.text
        }).then(function () {
          return true;
        }).catch(function (err) {
          if (isShareCancel(err)) {
            return true;
          }
          throw err;
        });
      }
      if (files.length > 1) {
        var chain = Promise.resolve();
        var allShared = true;
        var cancelled = false;
        files.forEach(function (file, i) {
          chain = chain.then(function () {
            if (cancelled) {
              return;
            }
            if (!navigator.canShare({ files: [file] })) {
              allShared = false;
              return;
            }
            return navigator.share({
              files: [file],
              title: shareMeta.title,
              text: shareMeta.textForPage ? shareMeta.textForPage(i) : shareMeta.text
            }).catch(function (err) {
              if (isShareCancel(err)) {
                cancelled = true;
                return;
              }
              throw err;
            });
          });
        });
        return chain.then(function () {
          return cancelled ? true : allShared;
        });
      }
      return Promise.resolve(false);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  var previewObjectUrls = [];

  function showImagePreview(files) {
    previewObjectUrls.forEach(function (url) {
      URL.revokeObjectURL(url);
    });
    previewObjectUrls = [];

    imagePreviewList.innerHTML = "";
    files.forEach(function (file) {
      var url = URL.createObjectURL(file);
      previewObjectUrls.push(url);

      var item = document.createElement("div");
      item.className = "image-preview-item";

      var img = document.createElement("img");
      img.src = url;
      img.alt = file.name;

      var caption = document.createElement("p");
      caption.className = "image-preview-caption";
      caption.textContent = file.name;

      // 長押し保存できない環境（主にPC）向けに、画像ごとの保存
      // リンクも用意しておく。iOS Safariではdownload属性は無視
      // されるが、その場合は長押しで保存すればよい。
      var saveLink = document.createElement("a");
      saveLink.className = "btn btn-secondary image-preview-save-link";
      saveLink.href = url;
      saveLink.download = file.name;
      saveLink.textContent = "この画像を保存";

      item.appendChild(img);
      item.appendChild(caption);
      item.appendChild(saveLink);
      imagePreviewList.appendChild(item);
    });

    imagePreviewModal.hidden = false;
    imagePreviewCloseBtn.focus();
  }

  function closeImagePreview() {
    imagePreviewModal.hidden = true;
    saveBtn.focus();
  }

  imagePreviewCloseBtn.addEventListener("click", closeImagePreview);
  imagePreviewModal.addEventListener("click", function (e) {
    if (e.target === imagePreviewModal) {
      closeImagePreview();
    }
  });

  // PC/Mac向け：一時的な<a download>リンクをクリックして、画像を
  // 自動的にダウンロードする。ダウンロードの成否はJavaScriptからは
  // 判定できないため、この後で必ず保存用プレビュー（手動保存の
  // 手段）も表示する。
  function downloadFile(file) {
    var url = URL.createObjectURL(file);
    var a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 2000);
  }

  function downloadFiles(files) {
    var chain = Promise.resolve();
    files.forEach(function (file) {
      chain = chain.then(function () {
        downloadFile(file);
        // 複数枚を連続でダウンロードすると、ブラウザに「複数ファイル
        // のダウンロード」としてブロックされることがあるため、
        // 1枚ごとに少し間隔を空ける。
        return new Promise(function (resolve) {
          setTimeout(resolve, 350);
        });
      });
    });
    return chain;
  }

  // 便箋・封筒どちらの画像保存にも使う共通処理。buildFilesFnはファイル
  // の配列を返す（同期のPromiseチェーンでもよい）関数、triggerBtnは
  // 保存中に文字を変える対象のボタン、onErrorは失敗時に呼ぶエラー
  // 表示関数（画面2/画面3のどちらのエラー表示を使うか呼び出し側が
  // 決める）、shareMetaはiPhone/iPadで共有するときのタイトル・説明文。
  function saveGeneratedImages(buildFilesFn, triggerBtn, onError, shareMeta) {
    var originalLabel = triggerBtn.textContent;
    triggerBtn.disabled = true;
    triggerBtn.textContent = "画像を作成中…";

    Promise.resolve()
      .then(buildFilesFn)
      .then(function (files) {
        if (!files || files.length === 0) {
          throw new Error("no files to save");
        }
        if (deviceKind === "ios") {
          // iPhone/iPad：Web Share APIで共有シートを開く。共有が
          // 使えない・失敗した場合はプレビューにフォールバックする。
          return tryShareFiles(files, shareMeta).catch(function () {
            return false;
          }).then(function (shared) {
            if (!shared) {
              showImagePreview(files);
            }
          });
        }
        // PC/Mac/その他：まず自動ダウンロードを試み、そのうえで
        // 確認・手動保存の手段としてプレビューも表示する。
        return downloadFiles(files).catch(function () {
          // ダウンロード自体は失敗を検知できないため、ここに
          // 来るのは想定外のエラー時のみ。プレビュー表示は
          // 下の.then()で必ず行われる。
        }).then(function () {
          showImagePreview(files);
        });
      })
      .catch(function () {
        onError("画像の保存に失敗しました。もう一度お試しください。");
      })
      .then(function () {
        triggerBtn.disabled = false;
        triggerBtn.textContent = originalLabel;
      });
  }

  function saveAsImages() {
    hideSaveError();
    saveGeneratedImages(function () {
      var pages = lastRenderedPages;
      if (!pages || pages.length === 0) {
        throw new Error("no letter pages found");
      }
      var files = [];
      var chain = Promise.resolve();
      pages.forEach(function (pageChunks, i) {
        chain = chain.then(function () {
          return buildPageImageFile(pageChunks, i + 1, pages.length).then(function (file) {
            files.push(file);
          });
        });
      });
      return chain.then(function () {
        return files;
      });
    }, saveBtn, showSaveError, {
      title: "お礼状",
      text: "お礼状の便箋画像です。",
      textForPage: function (i) {
        return "お礼状の便箋画像（" + (i + 1) + "枚目）です。";
      }
    });
  }

  function saveEnvelopeAsImage() {
    hideEnvelopeError();
    saveGeneratedImages(function () {
      drawEnvelopeSheet(envelopeCanvas, ENVELOPE_IMAGE_SCALE);
      return canvasToPngBlob(envelopeCanvas).then(function (blob) {
        return [new File([blob], buildEnvelopeFilenameBase() + ".png", { type: "image/png" })];
      });
    }, envelopeSaveBtn, showEnvelopeError, {
      title: "封筒見本",
      text: "封筒の見本画像です。"
    });
  }

  /* ---------------- 封筒の見本（v1.1で追加） ----------------
     長形3号（120mm×235mm）を基準に、A4横向き1枚へ「表面」「裏面」
     を並べた見本を作成する。実際の封筒へ直接印刷するものではなく、
     生徒がこの見本を見ながら手書きするための参考。

     画面プレビュー・印刷・画像保存のすべてで同じ<canvas>（1つの
     要素）をそのまま使う。理由：便箋の画像保存で分かったとおり、
     DOMをSVGのforeignObject経由でcanvas化する方式はtainted canvas
     になり使えないため、封筒も文字・枠線をcanvasへ直接描画する
     しかない。それなら最初から「画面表示用のcanvas」と「保存用の
     canvas」を分けず、同じcanvasを常に保存/印刷にそのまま使う方が、
     見た目のズレが起きようがなく、実装も単純になる。印刷時は
     このcanvasをCSSでA4横向きの実寸（297mm×210mm）に表示するだけ。
     外部ライブラリ・CDNは使用していない。 */

  var ENVELOPE_W_MM = 120;
  var ENVELOPE_H_MM = 235;
  var ENVELOPE_SHEET_MARGIN_MM = 10;
  var ENVELOPE_LABEL_MM = 12;
  var ENVELOPE_GAP_MM = 14;
  var ENVELOPE_IMAGE_SCALE = 3; // 印刷見本として使えるよう高解像度で描画する
  var ENVELOPE_PREVIEW_SCALE = 2; // 画面プレビュー（1面ずつ表示）用の解像度
  var envelopePreviewFace = "front"; // 画面プレビューで今表示している面

  // 学校の固定情報（封筒裏面用）。お礼状清書で使っている学校名
  // 「さいたま桜高等学園」とは別に、封筒裏面では正式な学校名を使う
  // よう指定されているため、専用の定数として持つ。
  var ENVELOPE_SCHOOL_POSTAL = "3380824"; // 〒338-0824
  var ENVELOPE_SCHOOL_ADDRESS = "埼玉県さいたま市桜区上大久保519-7";
  var ENVELOPE_SCHOOL_NAME = "埼玉県立特別支援学校さいたま桜高等学園";

  // 文章を最大maxChars文字ごとのかたまりに分割する（便箋のchunkText
  // と同じ考え方だが、列の文字数が便箋とは異なるため専用に用意する）。
  function envChunkText(text, maxChars) {
    var chars = text ? Array.from(text) : [];
    if (chars.length === 0) {
      return [""];
    }
    var chunks = [];
    for (var i = 0; i < chars.length; i += maxChars) {
      chunks.push(chars.slice(i, i + maxChars).join(""));
    }
    return chunks;
  }

  // 住所を列（縦書き）に分割する。envChunkTextのような単純な文字数
  // 区切りだと「1-2-3」のような数字＋ハイフンの途中や「丁目」
  // 「番地」の途中で不自然に列が変わったり、最後の列が1文字だけに
  // なったりしてしまう。完璧な住所解析は不要なので、数字・ハイフン
  // の並びや「丁目」「番地」をひとまとまり（アトム）として崩さずに
  // 詰めていく簡易的なロジックで、見た目の自然さだけを改善する。
  function splitAddressIntoColumns(text, maxChars) {
    var chars = text ? Array.from(text) : [];
    if (chars.length === 0) {
      return [""];
    }

    var NUM_RE = /^[0-9０-９\-－ー]$/;
    var KANA_RE = /^[゠-ヿ]$/;
    var atoms = [];
    var i = 0;
    while (i < chars.length) {
      var ch = chars[i];
      if ((ch === "丁" && chars[i + 1] === "目") || (ch === "番" && chars[i + 1] === "地")) {
        atoms.push(chars[i] + chars[i + 1]);
        i += 2;
        continue;
      }
      if (NUM_RE.test(ch)) {
        var j = i;
        while (j < chars.length && NUM_RE.test(chars[j])) {
          j++;
        }
        atoms.push(chars.slice(i, j).join(""));
        i = j;
        continue;
      }
      if (KANA_RE.test(ch)) {
        var k = i;
        while (k < chars.length && KANA_RE.test(chars[k])) {
          k++;
        }
        atoms.push(chars.slice(i, k).join(""));
        i = k;
        continue;
      }
      atoms.push(ch);
      i++;
    }

    // アトムを崩さずに、maxChars文字以内へ貪欲に詰めていく。
    var columns = [];
    var current = "";
    atoms.forEach(function (atom) {
      if (current.length > 0 && current.length + atom.length > maxChars) {
        columns.push(current);
        current = atom;
      } else {
        current += atom;
      }
    });
    if (current.length > 0) {
      columns.push(current);
    }

    // 最後の列が1文字だけの孤立した列にならないよう、可能なら
    // ひとつ前の列から1文字分けてもらう。
    if (columns.length >= 2 && Array.from(columns[columns.length - 1]).length === 1) {
      var prevChars = Array.from(columns[columns.length - 2]);
      if (prevChars.length > 1) {
        var moved = prevChars.pop();
        columns[columns.length - 2] = prevChars.join("");
        columns[columns.length - 1] = moved + columns[columns.length - 1];
      }
    }

    return columns;
  }

  // 郵便番号を「〒338-0824」のような通常の文字列表記にする
  // （裏面の学校郵便番号など、7枠ではなく文字列で見せたい場合に使う）。
  function formatPostalDisplay(rawDigits) {
    var digits = (rawDigits || "").replace(/[^0-9]/g, "");
    if (digits.length !== 7) {
      return "〒" + digits;
    }
    return "〒" + digits.slice(0, 3) + "-" + digits.slice(3);
  }

  // 縦書きで1文字描画する。text-orientation: mixed の縦書きで90度
  // 回転して縦線として表示される文字（長音符・カッコ類）と、セルの
  // 中央ではなく右上寄りに描かれる句読点は、便箋の画像描画と同じ
  // ROTATE_VERTICAL_CHARS / SHIFT_PUNCT_CHARS を再利用する。
  function envDrawChar(ctx, ch, centerX, cellTop, cellPitch, fontSizePx) {
    if (ch === " " || ch === "　") {
      return;
    }
    var cellCenterY = cellTop + cellPitch / 2;
    if (ROTATE_VERTICAL_CHARS[ch]) {
      ctx.save();
      ctx.translate(centerX, cellCenterY);
      ctx.rotate(Math.PI / 2);
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    } else if (SHIFT_PUNCT_CHARS[ch]) {
      ctx.fillText(ch, centerX + fontSizePx * 0.28, cellTop + fontSizePx * 0.38);
    } else {
      ctx.fillText(ch, centerX, cellCenterY);
    }
  }

  // 封筒内のローカルmm座標（0..120, 0..235）で1列ぶんの縦書き文字列
  // を描画する。toPxはそのローカル座標をシート全体のpx座標へ変換する
  // 関数（drawEnvelopeFaceが用意する）。
  function envDrawVerticalColumn(ctx, toPx, text, centerXLocal, topYLocal, charPitchLocalMm, fontSizeLocalMm, faceScale, mmToPx, bold) {
    var fontPx = fontSizeLocalMm * faceScale * mmToPx;
    ctx.font = (bold ? "bold " : "") + fontPx + "px " + SAVE_FONT_FAMILY;
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    Array.from(text).forEach(function (ch, i) {
      var top = toPx(centerXLocal, topYLocal + i * charPitchLocalMm);
      var bottom = toPx(centerXLocal, topYLocal + (i + 1) * charPitchLocalMm);
      envDrawChar(ctx, ch, top[0], top[1], bottom[1] - top[1], fontPx);
    });
  }

  // 郵便番号の文字列表記など、横書きで短い文字列を描画する。
  function envDrawHorizontalText(ctx, toPx, text, xLocal, yLocal, fontSizeLocalMm, faceScale, mmToPx, bold, align) {
    var fontPx = fontSizeLocalMm * faceScale * mmToPx;
    ctx.font = (bold ? "bold " : "") + fontPx + "px " + SAVE_FONT_FAMILY;
    ctx.fillStyle = "#000000";
    ctx.textAlign = align || "left";
    ctx.textBaseline = "middle";
    var p = toPx(xLocal, yLocal);
    ctx.fillText(text, p[0], p[1]);
  }

  // 郵便番号の枠（3桁＋4桁、計7マス）を描画する。startXLocal/startYLocal
  // はローカルmm座標。digitsは1文字ずつの配列（足りない分は空欄）。
  function envDrawPostalBoxes(ctx, toPx, faceScale, mmToPx, startXLocal, startYLocal, digits) {
    var boxW = 7;
    var boxH = 9;
    var gap = 1.5;
    var groupGap = 3;
    var x = startXLocal;
    for (var i = 0; i < 7; i++) {
      if (i === 3) {
        x += groupGap;
      }
      var p0 = toPx(x, startYLocal);
      var p1 = toPx(x + boxW, startYLocal + boxH);
      ctx.strokeStyle = "#999999";
      ctx.lineWidth = Math.max(1, mmToPx * 0.15);
      ctx.strokeRect(p0[0], p0[1], p1[0] - p0[0], p1[1] - p0[1]);
      if (digits[i]) {
        ctx.fillStyle = "#000000";
        ctx.font = (5.5 * faceScale * mmToPx) + "px " + SAVE_FONT_FAMILY;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(digits[i], (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2);
      }
      x += boxW + gap;
    }
  }

  function envelopePostalDigits(rawValue) {
    return Array.from((rawValue || "").replace(/[^0-9]/g, "").slice(0, 7));
  }

  function drawEnvelopeFrontFace(ctx, toPx, faceScale, mmToPx) {
    // 切手を貼る場所（左上）。料金は改定されるため表示しない。
    var sp0 = toPx(10, 10);
    var sp1 = toPx(35, 35);
    ctx.strokeStyle = "#999999";
    ctx.lineWidth = Math.max(1, mmToPx * 0.15);
    ctx.setLineDash([mmToPx * faceScale * 1.2, mmToPx * faceScale * 1.2]);
    ctx.strokeRect(sp0[0], sp0[1], sp1[0] - sp0[0], sp1[1] - sp0[1]);
    ctx.setLineDash([]);
    ctx.fillStyle = "#888888";
    ctx.font = (3.2 * faceScale * mmToPx) + "px " + SAVE_FONT_FAMILY;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var stampCenter = toPx(22.5, 22.5);
    ctx.fillText("切手", stampCenter[0], stampCenter[1]);

    // 実習先の郵便番号
    envDrawPostalBoxes(ctx, toPx, faceScale, mmToPx, 48, 16, envelopePostalDigits(state.envelopePostal));

    // 実習先の住所（縦書き、右寄りの列。長い場合は左隣の列へ続ける。
    // 数字＋ハイフンや「丁目」「番地」が不自然に分かれないよう、
    // splitAddressIntoColumnsで自然な位置で折り返す）
    var addressChunks = splitAddressIntoColumns(state.envelopeAddress.trim(), 20);
    addressChunks.forEach(function (chunk, i) {
      envDrawVerticalColumn(ctx, toPx, chunk, 103 - i * 9, 45, 5.2, 4.2, faceScale, mmToPx, false);
    });

    // 会社名・宛名（縦書き、住所より大きい文字。住所列との間隔を
    // 広めに取り、会社名がやや中央寄りに見えるようにする）
    var contact = state.envelopeContact.trim();
    var company = state.company.trim();
    var segments = contact ? [company, contact + "　様"] : [company, "御中"];
    var colX = 65;
    segments.forEach(function (seg) {
      envChunkText(seg, 14).forEach(function (chunk) {
        envDrawVerticalColumn(ctx, toPx, chunk, colX, 55, 7.8, 6.4, faceScale, mmToPx, true);
        colX -= 10;
      });
    });
  }

  function drawEnvelopeBackFace(ctx, toPx, faceScale, mmToPx) {
    // 封筒中央の継ぎ目・フラップを見本として分かる程度の線で表現する。
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = Math.max(1, mmToPx * 0.12);
    ctx.beginPath();
    var fl = toPx(0, 0);
    var fr = toPx(120, 0);
    var fc = toPx(60, 55);
    ctx.moveTo(fl[0], fl[1]);
    ctx.lineTo(fc[0], fc[1]);
    ctx.lineTo(fr[0], fr[1]);
    ctx.stroke();

    // 差出人情報（学校郵便番号・学校住所・学校名・氏名）は、封筒の
    // 右半分を余白として残し、左半分にまとまりよく配置する。
    // 学校の郵便番号は、裏面では7枠ではなく通常の文字列表記にする。
    envDrawHorizontalText(ctx, toPx, formatPostalDisplay(ENVELOPE_SCHOOL_POSTAL), 12, 72, 5.5, faceScale, mmToPx, false, "left");

    // 学校住所（縦書き、差出人情報の中でもっとも右寄りの列）
    splitAddressIntoColumns(ENVELOPE_SCHOOL_ADDRESS, 20).forEach(function (chunk, i) {
      envDrawVerticalColumn(ctx, toPx, chunk, 48 - i * 9, 85, 5.2, 4.2, faceScale, mmToPx, false);
    });

    // 学校名（学科・学年は表示しない。住所の左隣の列）。1列に収まる
    // 文字数を十分大きくとり、正式名称（19文字）が2列に分かれて
    // 読みにくくならないようにする。
    var colX = 35;
    envChunkText(ENVELOPE_SCHOOL_NAME, 24).forEach(function (chunk) {
      envDrawVerticalColumn(ctx, toPx, chunk, colX, 85, 6.5, 5.2, faceScale, mmToPx, true);
      colX -= 8.5;
    });

    // 生徒氏名（画面2で入力した氏名をそのまま使う。学校名よりさらに
    // 左・少し下寄りに配置する）
    envDrawVerticalColumn(ctx, toPx, state.name.trim(), 20, 130, 7.5, 6, faceScale, mmToPx, true);
  }

  function drawEnvelopeFace(ctx, mmToPx, originXmm, originYmm, faceScale, kind, label) {
    function toPx(xLocal, yLocal) {
      return [(originXmm + xLocal * faceScale) * mmToPx, (originYmm + yLocal * faceScale) * mmToPx];
    }

    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.font = "bold " + (6 * mmToPx) + "px " + SAVE_FONT_FAMILY;
    ctx.fillText(label, (originXmm + ENVELOPE_W_MM * faceScale / 2) * mmToPx, (originYmm - 3) * mmToPx);

    var p0 = toPx(0, 0);
    var p1 = toPx(ENVELOPE_W_MM, ENVELOPE_H_MM);
    ctx.strokeStyle = "#999999";
    ctx.lineWidth = Math.max(1, mmToPx * 0.2);
    ctx.strokeRect(p0[0], p0[1], p1[0] - p0[0], p1[1] - p0[1]);

    if (kind === "front") {
      drawEnvelopeFrontFace(ctx, toPx, faceScale, mmToPx);
    } else {
      drawEnvelopeBackFace(ctx, toPx, faceScale, mmToPx);
    }
  }

  // 画面プレビュー用に、表面・裏面のどちらか1面だけを大きく描画する。
  // 印刷・画像保存で使うdrawEnvelopeSheetとは別のcanvasに描くことで、
  // 印刷・保存の出力仕様（A4横1枚に表面＋裏面）を変えずに、スマホ
  // でも文字が読みやすいプレビューを実現する。
  function drawEnvelopeSingleFace(canvas, kind, scale) {
    var mmToPx = MM_TO_PX_BASE * scale;
    var marginMm = 6;
    var topMarginMm = marginMm + ENVELOPE_LABEL_MM;
    canvas.width = Math.round((ENVELOPE_W_MM + marginMm * 2) * mmToPx);
    canvas.height = Math.round((ENVELOPE_H_MM + marginMm + topMarginMm) * mmToPx);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var label = kind === "front" ? "表面" : "裏面";
    drawEnvelopeFace(ctx, mmToPx, marginMm, topMarginMm, 1, kind, label);
  }

  // A4横向き1枚に「表面」「裏面」を並べて描画する。canvasは印刷・
  // 画像保存専用（画面プレビューはdrawEnvelopeSingleFaceを使う）。
  function drawEnvelopeSheet(canvas, scale) {
    var mmToPx = MM_TO_PX_BASE * scale;
    var sheetWmm = 297;
    var sheetHmm = 210;
    canvas.width = Math.round(sheetWmm * mmToPx);
    canvas.height = Math.round(sheetHmm * mmToPx);
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var availH = sheetHmm - ENVELOPE_SHEET_MARGIN_MM * 2 - ENVELOPE_LABEL_MM;
    var envScale = availH / ENVELOPE_H_MM;
    var envWmm = ENVELOPE_W_MM * envScale;
    var totalWmm = envWmm * 2 + ENVELOPE_GAP_MM;
    var startXmm = (sheetWmm - totalWmm) / 2;
    var startYmm = ENVELOPE_SHEET_MARGIN_MM + ENVELOPE_LABEL_MM;

    drawEnvelopeFace(ctx, mmToPx, startXmm, startYmm, envScale, "front", "表面");
    drawEnvelopeFace(ctx, mmToPx, startXmm + envWmm + ENVELOPE_GAP_MM, startYmm, envScale, "back", "裏面");
  }

  function buildEnvelopeFilenameBase() {
    var namePart = state.name.trim().replace(/\s+/g, "");
    var datePart = state.date ? state.date.replace(/-/g, "") : "";
    var base = "封筒見本";
    if (datePart) {
      base += "_" + datePart;
    }
    if (namePart) {
      base += "_" + namePart;
    }
    return base;
  }

  function renderEnvelope() {
    envelopeCarryCompany.textContent = state.company.trim() || "（未入力）";
    envelopeCarryName.textContent = state.name.trim() || "（未入力）";
    drawEnvelopeSingleFace(envelopePreviewCanvas, envelopePreviewFace, ENVELOPE_PREVIEW_SCALE);
  }

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

  // 氏名を列の下寄せにする位置計算にだけ使う、文字サイズ・列の
  // 高さ(mm)。styles.css の --page-margin / --chars-per-column /
  // --height-buffer と同じ計算式・同じ値を保つ必要がある。
  var PAGE_MARGIN_MM = 14;
  var PAGE_HEIGHT_MM = 297;
  var HEIGHT_BUFFER = 1.03;
  var USABLE_HEIGHT_MM = PAGE_HEIGHT_MM - PAGE_MARGIN_MM * 2;
  var FONT_SIZE_MM = USABLE_HEIGHT_MM / (CHARS_PER_COLUMN * HEIGHT_BUFFER);

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
      "　それでは、" + musubi
    ];
  }

  // 本文・敬具・日付・学校情報・氏名・宛名のすべてを、1つの
  // 連続した列の並びとして組み立てる。「敬具以降をセットで次の
  // ページへ送る」のではなく、本文が終わった直後の列から続けて
  // 敬具→日付→学校情報→氏名→宛名の順に1列ずつ並べ、ページの
  // 15列を使い切ったところで自然に次のページへ続く（後述の
  // paginateFlatが単純に15列ごとに区切るだけで済む）。
  // 各要素は {text, className, offsetMm} の配列で表現する。
  // offsetMmは、その列の文字を上下どちらかへ寄せるための
  // margin-top（0なら列の一番上から書き始める＝既定の配置）。
  function buildMainChunks(segments) {
    var chunks = [];
    segments.forEach(function (seg) {
      chunkText(seg).forEach(function (c) {
        chunks.push({ text: c, className: "letter-main", offsetMm: 0 });
      });
    });
    return chunks;
  }

  var TOP_GAP_CHARS = 2; // 日付・学校情報・宛名は上から2マス空けて書き始める
  var KEIGU_BOTTOM_GAP_CHARS = 2; // 敬具は下から2マス空けた位置に書く
  var NAME_BOTTOM_GAP_CHARS = 2; // 氏名の最後の文字は下から2マス空けた位置

  function topOffsetChunks(text, className) {
    return chunkText(text).map(function (c, i) {
      // 2列目以降（同じ項目が25文字を超えて折り返した続き）は
      // 上寄せの空白を繰り返さず、そのまま列の上から続ける。
      return { text: c, className: className, offsetMm: i === 0 ? TOP_GAP_CHARS * FONT_SIZE_MM : 0 };
    });
  }

  // 学校名と学科・学年は「同じ学校情報として自然に続く」1つの列
  // として扱う（分けて2列にすると、後付け全体が1列分よけいに
  // 必要になってしまうため）。
  function buildClosingChunks(dateText, schoolInfoText, nameText, recipientText) {
    var chunks = [];

    // 敬具：列の下端から2マス空けた位置に配置（必ず1列＝2文字）。
    chunks.push({
      text: FIXED.kekkugo,
      className: "letter-closing",
      offsetMm: (CHARS_PER_COLUMN - KEIGU_BOTTOM_GAP_CHARS - Array.from(FIXED.kekkugo).length) * FONT_SIZE_MM
    });

    chunks = chunks.concat(topOffsetChunks(dateText, "letter-date"));
    chunks = chunks.concat(topOffsetChunks(schoolInfoText, "letter-school-info"));

    // 氏名：最後の文字が列の下端から2マス空けた位置に来るよう、
    // 最後のかたまりだけ下寄せにする。
    var nameParts = chunkText(nameText);
    nameParts.forEach(function (c, i) {
      var offsetMm = 0;
      if (i === nameParts.length - 1) {
        var blankAbove = Math.max(0, CHARS_PER_COLUMN - Array.from(c).length - NAME_BOTTOM_GAP_CHARS);
        offsetMm = blankAbove * FONT_SIZE_MM;
      }
      chunks.push({ text: c, className: "letter-name", offsetMm: offsetMm });
    });

    chunks = chunks.concat(topOffsetChunks(recipientText, "letter-recipient"));

    return chunks;
  }

  // 連続した列の並びを、単純に15列ごとに区切ってページに割り振る。
  // 本文と後付け（敬具〜宛名）を特別扱いせず同じ並びとして扱う
  // ことで、1ページ目の残り列をできるだけ使い切ってから、本当に
  // 収まりきらない分だけ自然に次のページへ続くようにしている。
  function paginateFlat(allChunks) {
    var pages = [];
    var idx = 0;
    var total = allChunks.length;

    while (idx < total && pages.length < MAX_PAGES) {
      var take = Math.min(NUM_COLUMNS, total - idx);
      pages.push(allChunks.slice(idx, idx + take));
      idx += take;
    }

    if (pages.length === 0) {
      pages.push([]);
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

  // 1ページぶんの列の並び（{text, className, offsetMm}の配列）を
  // 実際のdivとして描画する。列の高さはCSSで常に1列分ぴったりに
  // なるよう指定されているため、offsetMm（margin-top）を足した分
  // だけ高さを差し引き、box全体が列1つ分の範囲からはみ出さない
  // ようにする（はみ出すと見た目には出ないが、見えない領域が下の
  // ボタンなどへのクリックを邪魔してしまう可能性があるため）。
  function renderChunksAsColumns(parent, chunks) {
    chunks.forEach(function (chunk) {
      var el = document.createElement("div");
      el.className = chunk.className;
      el.appendChild(document.createTextNode(chunk.text));
      if (chunk.offsetMm) {
        el.style.marginTop = chunk.offsetMm.toFixed(2) + "mm";
        el.style.height = (USABLE_HEIGHT_MM - chunk.offsetMm).toFixed(2) + "mm";
      }
      parent.appendChild(el);
    });
  }

  function buildPageElement(pageChunks) {
    var built = createLetterPage();
    renderChunksAsColumns(built.content, pageChunks);
    return built.page;
  }

  // renderLetter()が最後に計算したページごとの列データ。DOMを
  // 再度読み取らなくても「画像で保存」がそのまま使えるように、
  // ここに保持しておく（個人情報を外部へ送るものではなく、
  // メモリ上に保持するだけ）。
  var lastRenderedPages = [];

  function renderLetter() {
    var mainSegments = buildMainSegments();
    var mainChunks = buildMainChunks(mainSegments);

    var dateText = reiwaKanjiDate(state.date);
    var schoolText = "さいたま桜高等学園";
    var gradeKanji = numberToKanji(Number(state.grade) || 1) + "年";
    var deptGradeText = "家政技術科" + gradeKanji;
    var schoolInfoText = schoolText + "　" + deptGradeText;
    var nameText = state.name.trim();
    var companyText = state.company.trim();
    var recipientText = companyText ? companyText + "　御中" : "";

    var closingChunks = buildClosingChunks(dateText, schoolInfoText, nameText, recipientText);
    var allChunks = mainChunks.concat(closingChunks);

    var result = paginateFlat(allChunks);
    lastRenderedPages = result.pages;

    letterPagesContainer.innerHTML = "";
    result.pages.forEach(function (pageChunks, i) {
      var block = document.createElement("div");
      block.className = "page-block";

      if (result.pages.length > 1) {
        var label = document.createElement("p");
        label.className = "page-label no-print";
        label.textContent = (i + 1) + "枚目 ／ 全" + result.pages.length + "枚";
        block.appendChild(label);
      }

      block.appendChild(buildPageElement(pageChunks));
      letterPagesContainer.appendChild(block);
    });

    fitWarning.hidden = !result.truncated;

    checkFit();
    scrollToFirstPage();
  }

  function scrollToFirstPage() {
    // 画面上はページ1が右端（日本語の縦書きらしく［2枚目］［1枚目］
    // の順）に表示されるので、プレビューを開いた直後からページ1が
    // 見えるよう、横スクロール位置を右端（＝末尾）へ合わせておく。
    window.requestAnimationFrame(function () {
      if (paperWrap) {
        paperWrap.scrollLeft = paperWrap.scrollWidth;
      }
    });
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
