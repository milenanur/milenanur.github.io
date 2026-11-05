/* ==========================================================
   main.js — JavaScript
   Функции этого файла: см. блоки ниже.
   Не переименовывайте CSS-классы и ID без проверки HTML.
   ========================================================== */
const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#main-navigation");
const isRussian = document.documentElement.lang.toLowerCase().startsWith("ru");

if (header && menuButton && navigation) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let closing = false;
  const headerSpace = document.createElement("div");
headerSpace.setAttribute("aria-hidden", "true");

function openMenu() {
  if (closing || navigation.classList.contains("is-open")) return;

  // Сохраняем место шапки, чтобы страница не сдвигалась
  headerSpace.style.height = `${header.getBoundingClientRect().height}px`;
  header.before(headerSpace);

  navigation.classList.add("is-open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", isRussian ? "Закрыть меню" : "メニューを閉じる");
}

function finishClose() {
  header.classList.remove("menu-closing");
  navigation.classList.remove("is-open");

  // Шапка вернулась — убираем временное место
  headerSpace.remove();

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", isRussian ? "Открыть меню" : "メニューを開く");

  closing = false;
}

  function closeMenu() {
    if (closing || !navigation.classList.contains("is-open")) return;

    if (reducedMotion.matches) {
      finishClose();
      return;
    }

    closing = true;
    header.classList.add("menu-closing");

    // Убираем меню после завершения выезда
    window.setTimeout(finishClose, 400);
  }

  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  header.classList.add("menu-ready");
  menuButton.hidden = false;

  menuButton.addEventListener("click", () => {
    if (navigation.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Mobile JP/RU switches the LANGUAGE OF THE OPEN MENU ONLY.
  // It must not navigate to another page or close the menu.
  const menuLanguageLinks = navigation.querySelectorAll(
    ".navigation-language.mobile-only a.language-jp, .navigation-language.mobile-only a.language-ru"
  );
  const menuLabels = {
    ja: ["トップ", "制作実績", "Webサイト", "バナー", "チラシ・パンフレット", "動画", "私について", "お問い合わせ"],
    ru: ["Главная", "Мои работы", "Веб-сайты", "Баннеры", "Листовки и буклеты", "Видео", "Обо мне", "Контакты"]
  };
  const menuItems = [
    ...navigation.querySelectorAll(":scope > a"),
  ];
  const submenuItems = [...navigation.querySelectorAll(".navigation-submenu.mobile-only > a")];
  // Navigation structure: Home, Works, four submenu links, About, Contact.
  const translatedItems = [menuItems[0], menuItems[1], ...submenuItems, menuItems[2], menuItems[3]];
  let selectedMenuLanguage = isRussian ? "ru" : "ja";

  function showMenuLanguage(language) {
    selectedMenuLanguage = language;
    const labels = menuLabels[language];
    // Update visible labels and their destinations, without leaving the page now.
    const prefix = language === "ru" ? (isRussian ? "" : "ru/") : (isRussian ? "../" : "");
    const paths = ["index.html", "index.html#works", "index.html#websites", "banners.html", "pamphlets.html", "videos.html", "about.html", "contact.html"];
    translatedItems.forEach((link, index) => {
      if (!link) return;
      link.textContent = labels[index];
      link.setAttribute("href", prefix + paths[index]);
    });
    menuLanguageLinks.forEach((link) => {
      const selected = (language === "ja" && link.classList.contains("language-jp")) ||
        (language === "ru" && link.classList.contains("language-ru"));
      link.setAttribute("aria-label", selected ? `${link.textContent.trim()} — выбран язык меню` : `${link.textContent.trim()} — переключить язык меню`);
      link.style.color = selected ? "var(--pink)" : "var(--text)";
      link.style.fontWeight = selected ? "700" : "400";
    });
  }

  if (menuLanguageLinks.length === 2 && translatedItems.every(Boolean)) {
    // Capturing intercepts clicks before the general close-menu handler below.
    navigation.addEventListener("click", (event) => {
      const langLink = event.target.closest(".navigation-language.mobile-only a");
      if (!langLink) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      showMenuLanguage(langLink.classList.contains("language-jp") ? "ja" : "ru");
    }, true);
    showMenuLanguage(selectedMenuLanguage);
  }

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navigation.classList.contains("is-open")
    ) {
      closeMenu();
      menuButton.focus();
    }
  });
}