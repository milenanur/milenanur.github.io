'use strict';
(() => {
  // Настройки из config.js и короткие функции поиска элементов.
  const config = window.BAKERY_CONFIG || {};
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  // Тексты двух языков. products: название и описание; newsItems: заголовок и текст.
  const copy = {
    // Русская версия.
    ru: {
      skip: 'К содержимому',
      about: 'О нас',
      news: 'Новости',
      menu: 'Меню',
      ourMenu: 'Наше меню',
      contacts: 'Контакты',
      contactHeading: 'Контакты',
      socialPending: 'Ссылка на эту страницу пока не добавлена.',
      welcome: 'Добро пожаловать',
      order: 'Сделать заказ',
      orderShort: 'Заказать',
      love: 'Испечено с любовью',
      slogan: 'Выпечка — <em>это</em> вкусно.',
      intro:
        'Каждый день мы создаём свежую, ароматную выпечку с любовью к традициям и вниманием к каждой детали. Хрустящий хлеб, нежные десерты и торты на заказ — всё, чтобы радовать вас и ваших близких. Подарите себе немного тепла и удовольствия с Bakery!',
      mapPending: 'Карта появится после добавления адреса',
      contactsPending: 'Контактные данные пекарни пока не добавлены.',
      orderPending:
        'Онлайн-заказ пока не подключён. Для заказа позвоните нам или напишите на почту.',
      close: 'Закрыть',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      previous: 'Предыдущий слайд',
      next: 'Следующий слайд',
      top: 'Наверх',
      slide: 'Слайд',
      title: 'Bakery — свежая выпечка',
      description: 'Bakery — свежая выпечка, десерты и торты на заказ.',
      shop: 'Витрина пекарни Bakery',
      map: 'Расположение пекарни',
      navigation: 'Основная навигация',
      footerNav: 'Нижняя навигация',
      products: [
        ['Домашний хлеб', 'На натуральной закваске с хрустящей корочкой'],
        ['Круассан', 'Воздушное слоёное тесто со сливочным вкусом'],
        ['Капкейк', 'Нежный ванильный крем и свежая малина'],
        ['Шоколадный торт', 'Насыщенный шоколадный вкус и нежный крем'],
        ['Печенье', 'Хрустящее печенье с кусочками шоколада'],
        ['Ягодный тарт', 'Песочная основа, нежный крем и свежие ягоды'],
        ['Эклер', 'Заварное тесто с кремом и шоколадной глазурью'],
        ['Булочка с корицей', 'Ароматная корица и нежная сливочная глазурь'],
        ['Багет', 'Французский багет с золотистой корочкой'],
      ],
      newsItems: [
        [
          'Осенние десерты',
          'Сезонные новинки уже в продаже! Нежный Монблан и другие осенние сладости.',
        ],
        [
          'Рождественская коллекция',
          'Принимаем предварительные заказы на праздничную выпечку и торты.',
        ],
        ['Мастер-класс по выпечке', 'Приглашаем детей на увлекательный мастер-класс!'],
      ],
      ribbons: ['Новинка', 'Скоро!', 'Событие'],
    },

    // Японская версия.
    ja: {
      skip: '本文へ',
      about: 'お店について',
      news: 'お知らせ',
      menu: 'メニュー',
      ourMenu: 'メニュー',
      contacts: 'お問い合わせ',
      contactHeading: '店舗情報・お問い合わせ',
      welcome: 'ようこそ、Bakeryへ',
      order: 'ご注文・お問い合わせ',
      orderShort: 'ご注文・お問い合わせ',
      love: '心を込めて焼き上げました',
      slogan: '焼きたての<em>しあわせ</em>。',
      intro:
        '毎日ひとつひとつ、心を込めてパンやお菓子を焼いています。\nパリッと香ばしいパン、やさしい甘さのスイーツ、特別な日を彩るケーキ。\nBakeryのおいしさとともに、大切な人と心あたたまるひとときをお過ごしください。',
      mapPending: '所在地が確定したら地図を掲載します',
      contactsPending: 'お問い合わせ先は、ただいま準備中です。',
      orderPending: 'オンライン注文は準備中です。お電話またはメールでお問い合わせください。',
      close: '閉じる',
      openMenu: 'メニューを開く',
      closeMenu: 'メニューを閉じる',
      previous: '前のスライド',
      next: '次のスライド',
      top: 'ページの先頭へ',
      slide: 'スライド',
      title: 'Bakery — 焼きたてのパンとお菓子',
      description: '焼きたてのパン、スイーツ、オーダーケーキをご紹介します。',
      shop: 'Bakeryの店頭',
      map: '店舗の所在地',
      navigation: 'メインナビゲーション',
      footerNav: 'フッターナビゲーション',
      socialPending: 'このSNSのリンクは、ただいま準備中です。',
      products: [
        ['自家製パン', '天然酵母で仕込んだ、香ばしい味わいのパン。'],
        ['クロワッサン', 'バターが香る、サクサクと軽い食感のクロワッサン。'],
        ['カップケーキ', 'ふんわり生地に、バニラクリームとラズベリーを添えて。'],
        ['チョコレートケーキ', '濃厚なチョコレートと、なめらかなクリームのハーモニー。'],
        ['チョコチップクッキー', 'チョコチップがたっぷり入った、サクサクのクッキー。'],
        ['ベリータルト', 'サクサクのタルト生地に、クリームと彩り豊かなベリーをのせて。'],
        ['エクレア', 'クリームを詰めたシュー生地を、チョコレートでコーティング。'],
        ['シナモンロール', '香り豊かなシナモンと、やさしい甘さのアイシング。'],
        ['バゲット', '外はパリッと、中はもっちりと焼き上げたフランスパン。'],
      ],
      newsItems: [
        ['秋のスイーツ', 'モンブランをはじめ、秋の味覚を楽しめるスイーツをご用意しました。'],
        ['クリスマスのパンとケーキ', 'クリスマスを彩るパンやケーキのご予約を承っております。'],
        ['パン作り体験', 'お子さま向けの楽しいパン作り体験を開催します。'],
      ],
      ribbons: ['季節限定', 'ご予約受付中', 'イベント'],
    },
  };

  // Имена файлов без расширений. Порядок совпадает с текстами выше.
  const productFiles = [
    'bred_circle',
    'croissant',
    'cup_cake',
    'chocolate_cake',
    'cookie',
    'berry_pastry',
    'eclair',
    'cinnamon_bun',
    'baton',
  ];
  const newsFiles = ['chestnut', 'bakery_news_christmas', 'ivent'];
  const ribbonFiles = ['new', 'soon', 'event'];
  const slides = [
    'bred',
    'hero_02_sourdough',
    'hero_03_croissants',
    'hero_04_multigrain',
    'hero_05_berry_tart',
  ];
  const slideAlts = {
    ru: [
      'Свежий хлеб с хрустящей корочкой',
      'Хлеб на закваске',
      'Свежие круассаны',
      'Зерновой хлеб',
      'Тарт со свежими ягодами',
    ],
    ja: [
      '焼きたてのパン',
      'サワードウブレッド',
      '焼きたてのクロワッサン',
      '雑穀パン',
      '新鮮なベリーのタルト',
    ],
  };

  // Состояние языка, меню и слайдера.
  const dialog = $('#mobile-menu');
  const burger = $('#burger');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let language = 'ru';
  let currentSlide = 0;
  let timer;
  let autoPaused = false;
  let moving = false;
  let slideFallback;
  let pendingDirection = 0;
  let slidePosition = 1;
  const track = $('#hero-track');
  // Follow the language of the portfolio card on first arrival, while preserving
  // the existing language switcher and saved preference on subsequent visits.
  try {
    if (localStorage.getItem('bakery-language') === 'ja') language = 'ja';
  } catch {}
  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  if (requestedLanguage === 'ja' || requestedLanguage === 'ru') {
    language = requestedLanguage;
  }

  // Проверка ссылок и создание изображений.
  function safeUrl(value, protocols = ['https:', 'http:', 'mailto:', 'tel:']) {
    if (!value) return null;
    try {
      const u = new URL(value, location.href);
      return protocols.includes(u.protocol) ? u.href : null;
    } catch {
      return null;
    }
  }
  function image(path, alt, className) {
    const im = document.createElement('img');
    im.src = path;
    im.alt = alt;
    im.loading = 'lazy';
    if (className) im.className = className;
    return im;
  }

  // Создание карточек меню.
  function renderProducts() {
    const target = $('#products');
    target.replaceChildren();
    copy[language].products.forEach(([title, desc], i) => {
      const article = document.createElement('article');
      article.className = 'product';
      article.append(image(`image/foto/${productFiles[i]}.webp`, title));
      const body = document.createElement('div');
      body.className = 'product-copy';
      const h = document.createElement('h3');
      h.textContent = title;
      const p = document.createElement('p');
      p.textContent = desc;
      body.append(h, p);
      article.append(body);
      target.append(article);
    });
  }

  // Создание новостей и ленточек на выбранном языке.
  function renderNews() {
    const target = $('#news-grid');
    target.replaceChildren();
    copy[language].newsItems.forEach(([title, desc], i) => {
      const article = document.createElement('article');
      article.className = 'news-card';
      article.append(image(`image/foto/${newsFiles[i]}.webp`, title, 'news-photo'));
      const body = document.createElement('div');
      body.className = 'news-copy';
      const h = document.createElement('h3');
      h.textContent = title;
      const p = document.createElement('p');
      p.textContent = desc;
      body.append(h, p);
      article.append(body);
      if (language === 'ja') {
        const ribbon = document.createElement('span');
        ribbon.className = 'ribbon ribbon-label';
        ribbon.textContent = copy[language].ribbons[i];
        article.append(ribbon);
      } else {
        article.append(
          image(
            `image/decorations/ribbon_${ribbonFiles[i]}_ru.png`,
            copy[language].ribbons[i],
            'ribbon',
          ),
        );
      }
      target.append(article);
    });
  }

  // Контакты, кнопки соцсетей и встроенная карта Google.
  function renderContacts() {
    const target = $('#contact-details');
    target.replaceChildren();
    const address = config.address?.[language] || config.address?.ru;
    const hours = config.hours?.[language] || config.hours?.ru;
    const rows = [
      [address, 'address', null],
      [hours, 'time', null],
      [config.phone, 'phone', config.phone ? `tel:${config.phone.replace(/[^+\d]/g, '')}` : null],
      [config.email, 'mail', config.email ? `mailto:${config.email}` : null],
    ];
    rows.forEach(([label, icon, url]) => {
      if (!label) return;
      const row = document.createElement('div');
      row.className = 'contact-row';
      row.append(image(`image/icons/icon_${icon}.svg`, ''));
      const el = document.createElement(url ? 'a' : 'span');
      el.textContent = label;
      if (url) el.href = safeUrl(url);
      row.append(el);
      target.append(row);
    });
    if (!rows.some((r) => r[0])) {
      const p = document.createElement('p');
      p.className = 'contact-pending';
      p.textContent = copy[language].contactsPending;
      target.append(p);
    }
    const social = document.createElement('div');
    social.className = 'socials';
    [
      ['facebook', config.facebookUrl],
      ['instagram', config.instagramUrl],
    ].forEach(([name, url]) => {
      const href = safeUrl(url, ['https:', 'http:']);
      const a = document.createElement(href ? 'a' : 'button');
      a.className = 'social-link';
      const label = name === 'facebook' ? 'Facebook' : 'Instagram';
      a.setAttribute('aria-label', label);
      if (href) {
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      } else {
        a.type = 'button';
        a.addEventListener('click', () => {
          $('#social-title').textContent = label;
          $('#social-message').textContent = copy[language].socialPending;
          $('#social-dialog').showModal();
        });
      }
      a.append(image(`image/icons/icon_${name}.svg`, ''));
      social.append(a);
    });
    target.append(social);
    const map = $('.map-placeholder');
    map.replaceChildren();
    map.classList.toggle('real-map', !!config.mapImage);
    if (config.mapEmbedUrl) {
      const src = safeUrl(config.mapEmbedUrl, ['https:']);
      if (
        src &&
        new URL(src).hostname === 'www.google.com' &&
        new URL(src).pathname === '/maps/embed'
      ) {
        const frame = document.createElement('iframe');
        const embedUrl = new URL(src);
        const mapLanguage = language === 'ja' ? 'ja' : 'ru';
        const pb = embedUrl.searchParams.get('pb');
        if (pb)
          embedUrl.searchParams.set(
            'pb',
            pb.replace(/!1s(?:ru|ja)!2sjp/g, `!1s${mapLanguage}!2sjp`),
          );
        embedUrl.searchParams.set('hl', mapLanguage);
        frame.src = embedUrl.href;
        frame.title = copy[language].map;
        frame.loading = 'lazy';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        map.classList.add('real-map');
        map.append(frame);
        return;
      }
    }
    if (config.mapImage) {
      const im = image(config.mapImage, copy[language].map);
      const href = safeUrl(config.mapUrl, ['https:', 'http:']);
      if (href) {
        const a = document.createElement('a');
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.append(im);
        map.append(a);
      } else map.append(im);
    } else {
      map.append(image('image/icons/icon_address.svg', ''));
      const p = document.createElement('p');
      p.textContent = copy[language].mapPending;
      map.append(p);
    }
  }

  // Смена языка: тексты, плашки, подписи кнопок и сохранение выбора.
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next;
    const t = copy[next];
    document.title = t.title;
    $('meta[name=description]').content = t.description;
    $$('[data-i18n]').forEach((el) => (el.textContent = t[el.dataset.i18n]));
    $$('[data-i18n-html]').forEach((el) => (el.innerHTML = t[el.dataset.i18nHtml]));
    $$('[data-language]').forEach((el) =>
      el.setAttribute('aria-pressed', String(el.dataset.language === next)),
    );
    $$('[data-heading]').forEach((el) => {
      const key = el.dataset.heading;
      el.src = `image/decorations/${key === 'news' && next === 'ru' ? 'news' : `${key}_${next === 'ja' ? 'jp' : 'ru'}`}.png`;
      el.alt = '';
      el.hidden = false;
      const title =
        next === 'ja'
          ? { menu: 'メニュー', news: 'ニュース', contact: 'お問い合わせ' }[key]
          : { menu: 'Наше меню', news: 'Новости', contact: 'Контакты' }[key];
      el.parentElement.querySelector('.sr-only').textContent = title;
    });
    $('#special-ru').hidden = next === 'ja';
    $('#special-jp').hidden = next !== 'ja';
    burger.setAttribute('aria-label', t.openMenu);
    $('#close-menu').setAttribute('aria-label', t.closeMenu);
    $('.previous').setAttribute('aria-label', t.previous);
    $('.next').setAttribute('aria-label', t.next);
    $('.to-top').setAttribute('aria-label', t.top);
    $('.shop-photo').alt = t.shop;
    $('.desktop-nav').setAttribute('aria-label', t.navigation);
    $('.mobile-nav').setAttribute('aria-label', t.navigation);
    $('.footer nav').setAttribute('aria-label', t.footerNav);
    $('.hero').setAttribute('aria-label', t.title);
    $$('.order-close').forEach((b) => b.setAttribute('aria-label', t.close));
    renderProducts();
    renderNews();
    renderContacts();
    formatJapaneseText();
    updateSlide();
    updatePauseButton();
    try {
      localStorage.setItem('bakery-language', next);
    } catch {}
  }
  // Копии крайних фотографий обеспечивают плавный переход с последнего слайда на первый.
  const photoIndexes = [slides.length - 1, ...slides.map((_, i) => i), 0];
  track.replaceChildren();
  photoIndexes.forEach((index, position) => {
    const im = document.createElement('img');
    im.src = `image/foto/${slides[index]}.webp`;
    im.dataset.slideIndex = String(index);
    im.alt = '';
    im.width = 1440;
    im.height = 640;
    im.decoding = 'async';
    if (position === 1) {
      im.id = 'hero-image';
      im.fetchPriority = 'high';
    } else {
      im.fetchPriority = 'low';
    }
    const frame = document.createElement('div');
    frame.className = 'slide-frame';
    frame.append(im);
    track.append(frame);
  });

  // Переносы японского текста по смысловым группам, без разрыва коротких слов.
  function formatJapaneseText() {
    if (language !== 'ja') return;
    const segmenter =
      typeof Intl.Segmenter === 'function'
        ? new Intl.Segmenter('ja', { granularity: 'word' })
        : null;
    const titleChunks = {
      カップケーキ: ['カップケーキ'],
      チョコレートケーキ: ['チョコレート', 'ケーキ'],
      チョコチップクッキー: ['チョコチップ', 'クッキー'],
      シナモンロール: ['シナモン', 'ロール'],
      秋のスイーツ: ['秋の', 'スイーツ'],
      クリスマスのパンとケーキ: ['クリスマスの', 'パンとケーキ'],
      パン作り体験: ['パン作り', '体験'],
      '毎日ひとつひとつ、心を込めてパンやお菓子を焼いています。\nパリッと香ばしいパン、やさしい甘さのスイーツ、特別な日を彩るケーキ。\nBakeryのおいしさとともに、大切な人と心あたたまるひとときをお過ごしください。':
        [
          '毎日ひとつひとつ、',
          '心を込めて',
          'パンやお菓子を',
          '焼いています。',
          '\n',
          'パリッと香ばしいパン、',
          'やさしい甘さの',
          'スイーツ、',
          '特別な日を',
          '彩るケーキ。',
          '\n',
          'Bakeryの',
          'おいしさとともに、',
          '大切な人と',
          '心あたたまる',
          'ひとときを',
          'お過ごしください。',
        ],
      '天然酵母で仕込んだ、香ばしい味わいのパン。': [
        '天然酵母で',
        '仕込んだ、',
        '香ばしい',
        '味わいの',
        'パン。',
      ],
      'バターが香る、サクサクと軽い食感のクロワッサン。': [
        'バターが香る、',
        'サクサクと',
        '軽い食感の',
        'クロワッサン。',
      ],
      'ふんわり生地に、バニラクリームとラズベリーを添えて。': [
        'ふんわり生地に、',
        'バニラクリームと',
        'ラズベリーを',
        '添えて。',
      ],
      '濃厚なチョコレートと、なめらかなクリームのハーモニー。': [
        '濃厚な',
        'チョコレートと、',
        'なめらかな',
        'クリームの',
        'ハーモニー。',
      ],
      'チョコチップがたっぷり入った、サクサクのクッキー。': [
        'チョコチップが',
        'たっぷり入った、',
        'サクサクの',
        'クッキー。',
      ],
      'サクサクのタルト生地に、クリームと彩り豊かなベリーをのせて。': [
        'サクサクの',
        'タルト生地に、',
        'クリームと',
        '彩り豊かな',
        'ベリーを',
        'のせて。',
      ],
      'クリームを詰めたシュー生地を、チョコレートでコーティング。': [
        'クリームを',
        '詰めた',
        'シュー生地を、',
        'チョコレートで',
        'コーティング。',
      ],
      '香り豊かなシナモンと、やさしい甘さのアイシング。': [
        '香り豊かな',
        'シナモンと、',
        'やさしい甘さの',
        'アイシング。',
      ],
      '外はパリッと、中はもっちりと焼き上げたフランスパン。': [
        '外はパリッと、',
        '中はもっちりと',
        '焼き上げた',
        'フランスパン。',
      ],
      'モンブランをはじめ、秋の味覚を楽しめるスイーツをご用意しました。': [
        'モンブランを',
        'はじめ、',
        '秋の味覚を',
        '楽しめる',
        'スイーツを',
        'ご用意しました。',
      ],
      'クリスマスを彩るパンやケーキのご予約を承っております。': [
        'クリスマスを',
        '彩る',
        'パンやケーキの',
        'ご予約を',
        '承っております。',
      ],
      'お子さま向けの楽しいパン作り体験を開催します。': [
        'お子さま向けの',
        '楽しい',
        'パン作り体験を',
        '開催します。',
      ],
    };
    $$('.intro,.product h3,.product p,.news-copy h3,.news-copy p').forEach((el) => {
      const text = el.textContent;
      const segments =
        titleChunks[text] ||
        (segmenter
          ? [...segmenter.segment(text)].map((part) => part.segment)
          : text.split(/(?<=[、。])/u));
      const chunks = [];
      segments.forEach((piece) => {
        if (
          chunks.length &&
          (/^[、。，．！？!?）」』】〕］〉》]+$/u.test(piece) ||
            /^(は|が|を|に|の|へ|と|も|で|や|て|た|ます|です|ました|ください|から|まで|より|など)$/u.test(
              piece,
            ))
        )
          chunks[chunks.length - 1] += piece;
        else chunks.push(piece);
      });
      el.replaceChildren();
      chunks.forEach((piece) => {
        if (/^\s+$/u.test(piece)) {
          el.append(document.createTextNode(piece));
          return;
        }
        const span = document.createElement('span');
        span.className = 'jp-word';
        span.textContent = piece;
        el.append(span);
      });
    });
  }

  // Слайдер: текущий кадр, плавное движение и бесконечный цикл.
  function updateSlide() {
    $$('img', track).forEach((im, position) => {
      const active = position === slidePosition;
      im.alt = active ? slideAlts[language][currentSlide] : '';
      im.setAttribute('aria-hidden', String(!active));
    });
    $$('#dots button').forEach((b, i) => {
      b.setAttribute('aria-current', String(i === currentSlide));
      b.setAttribute('aria-label', `${copy[language].slide} ${i + 1}`);
    });
  }
  function finishSlide() {
    clearTimeout(slideFallback);
    if (slidePosition === 0 || slidePosition === slides.length + 1) {
      slidePosition = slidePosition === 0 ? slides.length : 1;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${slidePosition * 100}%)`;
    }
    moving = false;
    updateSlide();
    if (pendingDirection) {
      const delta = pendingDirection;
      pendingDirection = 0;
      requestAnimationFrame(() => requestAnimationFrame(() => goSlide(delta)));
    }
  }
  track.addEventListener('transitionend', (event) => {
    if (event.target === track && event.propertyName === 'transform') finishSlide();
  });
  function moveSlide(next, position) {
    if (moving) return;
    currentSlide = next;
    slidePosition = position;
    moving = !reducedMotion.matches;
    track.style.transition = reducedMotion.matches
      ? 'none'
      : 'transform 550ms cubic-bezier(.22,.65,.3,1)';
    track.style.transform = `translateX(-${position * 100}%)`;
    updateSlide();
    if (reducedMotion.matches) finishSlide();
    else slideFallback = setTimeout(finishSlide, 700);
  }

  // Автопрокрутка каждые 5 секунд; пауза при открытом меню и скрытой вкладке.
  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }
  function startTimer() {
    stopTimer();
    if (
      reducedMotion.matches ||
      autoPaused ||
      document.hidden ||
      dialog.open ||
      $('#order-dialog').open
    )
      return;
    timer = setInterval(() => {
      goSlide(1);
    }, 5000);
  }
  function goSlide(delta) {
    if (moving) {
      pendingDirection = delta;
      return;
    }
    moveSlide((currentSlide + delta + slides.length) % slides.length, currentSlide + 1 + delta);
    startTimer();
  }
  function updatePauseButton() {
    const b = $('.slider-toggle');
    b.setAttribute('aria-pressed', String(autoPaused));
    b.setAttribute(
      'aria-label',
      language === 'ja'
        ? autoPaused
          ? 'スライドショーを再生'
          : 'スライドショーを一時停止'
        : autoPaused
          ? 'Продолжить слайдер'
          : 'Приостановить слайдер',
    );
    b.hidden = reducedMotion.matches;
  }
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.addEventListener('click', () => {
      if (i === currentSlide || moving) return;
      moveSlide(i, i + 1);
      startTimer();
    });
    $('#dots').append(b);
  });
  $('.previous').addEventListener('click', () => goSlide(-1));
  $('.next').addEventListener('click', () => goSlide(1));
  $('.slider-toggle').addEventListener('click', () => {
    autoPaused = !autoPaused;
    updatePauseButton();
    startTimer();
  });
  document.addEventListener('visibilitychange', startTimer);
  reducedMotion.addEventListener('change', () => {
    finishSlide();
    updatePauseButton();
    startTimer();
  });

  // Бургер-меню: открытие, закрытие, возврат фокуса и переходы к разделам.
  let previousOverflow = '';
  function openMenu() {
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    burger.setAttribute('aria-expanded', 'true');
    stopTimer();
    $('#close-menu').focus();
  }
  function closeMenu() {
    if (dialog.open) dialog.close();
  }
  burger.addEventListener('click', openMenu);
  $('#close-menu').addEventListener('click', closeMenu);
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    burger.setAttribute('aria-expanded', 'false');
    burger.focus({ preventScroll: true });
    startTimer();
  });
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right) closeMenu();
    }
  });
  $$('a[href^="#"]', dialog).forEach((a) =>
    a.addEventListener('click', (e) => {
      const section = $(a.getAttribute('href'));
      if (!section) return;
      e.preventDefault();
      closeMenu();
      section.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
      history.replaceState(null, '', a.getAttribute('href'));
    }),
  );
  matchMedia('(min-width:721px)').addEventListener('change', (e) => {
    if (e.matches) closeMenu();
  });
  $$('[data-language]').forEach((b) =>
    b.addEventListener('click', () => setLanguage(b.dataset.language)),
  );

  // Заказ: ссылка из настроек или окно с контактами. В JP — переход к контактам.
  const orderDialog = $('#order-dialog');
  let orderTrigger = null;
  $$('[data-order]').forEach((b) =>
    b.addEventListener('click', () => {
      if (language === 'ja') {
        closeMenu();
        $('#contacts').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
        $('#contacts').setAttribute('tabindex', '-1');
        $('#contacts').focus({ preventScroll: true });
        history.replaceState(null, '', '#contacts');
        return;
      }
      const href = safeUrl(config.orderUrl);
      if (href) {
        location.href = href;
        return;
      }
      orderTrigger = dialog.open ? burger : b;
      closeMenu();
      orderDialog.showModal();
      stopTimer();
    }),
  );
  $$('.order-close,.order-dismiss').forEach((b) =>
    b.addEventListener('click', () => orderDialog.close()),
  );
  orderDialog.addEventListener('close', () => {
    orderTrigger?.focus({ preventScroll: true });
    startTimer();
  });
  $$('.social-close').forEach((b) =>
    b.addEventListener('click', () => $('#social-dialog').close()),
  );

  // Кнопка наверх и подсветка текущего раздела в мобильном меню.
  const topButton = $('.to-top');
  addEventListener('scroll', () => (topButton.hidden = scrollY < innerHeight * 0.7), {
    passive: true,
  });
  topButton.addEventListener('click', () =>
    scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' }),
  );
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            $$('.mobile-nav a').forEach((a) => {
              if (a.hash === `#${entry.target.id}`) a.setAttribute('aria-current', 'location');
              else a.removeAttribute('aria-current');
            });
        });
      },
      { rootMargin: '-10% 0px -50% 0px' },
    );
    $$('main section[id]').forEach((s) => observer.observe(s));
  }

  // Запуск страницы с сохранённым языком.
  setLanguage(language);
  startTimer();
})();
