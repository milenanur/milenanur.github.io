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