/* ==========================================================
   banners.js — JavaScript
   Функции этого файла: см. блоки ниже.
   Не переименовывайте CSS-классы и ID без проверки HTML.
   ========================================================== */
/* Увеличение баннеров. main.js продолжает управлять общим меню. */
(() => {
  const cards = [...document.querySelectorAll('.banners-page [data-banner]')];
  const dialog = document.querySelector('.banner-viewer');
  if (!dialog || typeof dialog.showModal !== 'function' || !cards.length) return;
  const image = dialog.querySelector('.viewer-image');
  const title = dialog.querySelector('#viewer-title');
  const position = dialog.querySelector('.viewer-position');
  const original = dialog.querySelector('.viewer-original');
  let current = 0;
  let opener;
  function show(index) {
    current = (index + cards.length) % cards.length;
    const card = cards[current];
    image.src = card.href;
    image.alt = card.dataset.title;
    title.textContent = card.dataset.title;
    original.href = card.href;
    position.textContent = `${current + 1} / ${cards.length}`;
  }
  cards.forEach((card, index) => card.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = card;
    show(index);
    dialog.showModal();
  }));
  dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.viewer-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.viewer-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));
})();
