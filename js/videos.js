/* ==========================================================
   videos.js — JavaScript
   Функции этого файла: см. блоки ниже.
   Не переименовывайте CSS-классы и ID без проверки HTML.
   ========================================================== */

/* ==========================================================
   ВИДЕО — videos.js
   Миниатюры и просмотр YouTube внутри сайта.
   Общее меню обслуживает main.js.
   ========================================================== */


/* ==================== МИНИАТЮРЫ ==================== */

(() => {
  const images = document.querySelectorAll(
    ".videos-page .video-image"
  );

  images.forEach((image) => {
    const preview = image.closest(".video-preview");
    const placeholder = preview?.querySelector(".video-placeholder");

    function updatePreview() {
      const loaded = image.complete && image.naturalWidth > 0;

      image.classList.toggle("is-loaded", loaded);

      if (placeholder) {
        placeholder.hidden = loaded;
      }
    }

    image.addEventListener("load", updatePreview);
    image.addEventListener("error", updatePreview);

    updatePreview();
  });
})();


/* ==================== ОКНО YOUTUBE ==================== */

(() => {
  const dialog = document.querySelector(
    ".videos-page .video-viewer"
  );

  if (!dialog || typeof dialog.showModal !== "function") {
    return;
  }

  const player = dialog.querySelector(".video-viewer-player");
  const title = dialog.querySelector("#video-viewer-title");
  const youtubeLink = dialog.querySelector(".video-viewer-youtube");
  const closeButton = dialog.querySelector(".video-viewer-close");

  const cards = document.querySelectorAll(
    ".videos-page .video-card"
  );

  let trigger = null;


  /* ---------- Начало воспроизведения ---------- */

  function getStart(value) {
    if (!value) return 0;

    if (/^\d+s?$/.test(value)) {
      return parseInt(value, 10);
    }

    const parts = value.match(
      /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/
    );

    if (!parts) return 0;

    return (
      Number(parts[1] || 0) * 3600 +
      Number(parts[2] || 0) * 60 +
      Number(parts[3] || 0)
    );
  }


  /* ---------- Подсказка для карточек ---------- */

  const hint = document.querySelector("#video-new-tab");

  if (hint) {
    hint.textContent =
      "ページ内のウィンドウで動画を開きます。";
  }


  /* ==================== ОТКРЫТИЕ ВИДЕО ==================== */

  cards.forEach((card) => {
    card.setAttribute("aria-haspopup", "dialog");

    card.addEventListener("click", (event) => {

      // Обычный клик не открывает новую вкладку.
      // Cmd/Ctrl + клик оставляем для отдельной вкладки.
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      // Сразу отменяем переход по HTML-ссылке.
      event.preventDefault();

      if (dialog.open) return;

      let url;

      try {
        url = new URL(card.href);
      } catch {
        return;
      }

      const hostname = url.hostname.toLowerCase();

      if (
        hostname !== "www.youtube.com" &&
        hostname !== "youtube.com" &&
        hostname !== "youtu.be"
      ) {
        return;
      }

      const videoId =
        hostname === "youtu.be"
          ? url.pathname.slice(1)
          : url.searchParams.get("v");

      if (
        !videoId ||
        !/^[a-zA-Z0-9_-]{11}$/.test(videoId)
      ) {
        return;
      }

      const label =
        card.querySelector("h3")?.textContent.trim() ||
        "動画";


      /* ---------- Создаём встроенный YouTube ---------- */

      const embed = new URL(
        `https://www.youtube.com/embed/${videoId}`
      );

      embed.searchParams.set("autoplay", "1");
      embed.searchParams.set("playsinline", "1");
      embed.searchParams.set("rel", "0");

      const start = getStart(
        url.searchParams.get("start") ||
        url.searchParams.get("t")
      );

      if (start > 0) {
        embed.searchParams.set("start", String(start));
      }


      /* ---------- Настройки iframe ---------- */

      const iframe = document.createElement("iframe");

      iframe.title = label + " — YouTube";

      iframe.allow =
        "accelerometer; autoplay; clipboard-write; " +
        "encrypted-media; gyroscope; picture-in-picture; web-share";

      iframe.allowFullscreen = true;

      iframe.referrerPolicy =
        "strict-origin-when-cross-origin";

      iframe.src = embed.href;


      /* ---------- Показываем окно ---------- */

      title.textContent = label;
      youtubeLink.href = card.href;

      trigger = card;

      player.replaceChildren(iframe);

      dialog.showModal();
    });
  });


  /* ==================== ЗАКРЫТИЕ ОКНА ==================== */

  function closeViewer() {
    player.replaceChildren();

    if (dialog.open) {
      dialog.close();
    }
  }

  closeButton.addEventListener("click", closeViewer);

  // Закрытие через Escape.
  dialog.addEventListener("cancel", () => {
    player.replaceChildren();
  });

  // Возвращаем фокус на выбранную карточку.
  dialog.addEventListener("close", () => {
    player.replaceChildren();

    if (trigger) {
      trigger.focus({ preventScroll: true });
    }

    trigger = null;
  });


  /* ---------- Закрытие по тёмному фону ---------- */

  function outside(event) {
    const rect = dialog.getBoundingClientRect();

    return (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    );
  }

  let pressedOutside = false;

  dialog.addEventListener("pointerdown", (event) => {
    pressedOutside =
      event.target === dialog && outside(event);
  });

  dialog.addEventListener("click", (event) => {
    if (
      pressedOutside &&
      event.target === dialog &&
      outside(event)
    ) {
      closeViewer();
    }

    pressedOutside = false;
  });

})();
