(function () {
  var STORAGE_KEY = 'bonsainftart-lang';
  var body = document.body;
  var toggle = document.getElementById('lang-toggle');
  var currentLang = 'ja';

  /* =========================================================
     Collection data
     ---------------------------------------------------------
     Keyed by the data-collection attribute on each .card.

     Title, tagline and OpenSea link are read from the card itself,
     so an entry only needs to supply the artwork list. A collection
     with no entry here opens a "coming soon" modal — add a `works`
     array below and it starts rendering, no other change needed.

     `base` is the image path without extension; the modal serves
     <base>.webp with a <base>.png fallback.
     ========================================================= */
  var COLLECTIONS = {
    fortune: {
      meta: { ja: '全4作品 · 各 0.05 WETH', en: '4 works · 0.05 WETH each' },
      works: [
        {
          base: 'images/BONSAI FORTUNE/梅',
          titleJa: '起・梅「兆し」',
          titleEn: 'Ki – Plum: "The Omen"',
          descJa: 'まだ冷たい空気の中、梅だけが先んじて花をひらく。吉祥の物語は、この小さな兆しから始まる。',
          descEn: 'While the air still holds winter’s chill, the plum blooms first. The story of fortune begins with this quiet omen.'
        },
        {
          base: 'images/BONSAI FORTUNE/竹',
          titleJa: '承・竹「しなり」',
          titleEn: 'Sho – Bamboo: "The Bend"',
          descJa: '四季を通じて色を変えぬ竹は、絶えることのない継続の象徴。兆しは、ここで確かな歩みへと変わる。',
          descEn: 'Unchanging through every season, bamboo stands for quiet continuity. Here, the omen becomes a steady stride.'
        },
        {
          base: 'images/BONSAI FORTUNE/金柑',
          titleJa: '転・金柑「実り」',
          titleEn: 'Ten – Kumquat: "The Turning"',
          descJa: '小さな実に宿る「金」の字が、物語に転機と豊かさをもたらす。根はあえて大きく晒し、見えない部分にこそ強さがあることを示す。',
          descEn: 'The character for "gold" hidden in its name brings a turn of fortune. Its roots are left exposed — strength often lives where it isn’t seen.'
        },
        {
          base: 'images/BONSAI FORTUNE/松',
          titleJa: '結・松「常磐」',
          titleEn: 'Ketsu – Pine: "Evergreen"',
          descJa: '兆し、しなり、転機を経て辿り着くのは、常に緑を絶やさぬ松の姿。吉祥の物語は、ここに静かな重みをもって結ばれる。',
          descEn: 'Through omen, resilience, and unexpected fortune, the story arrives here — in the pine that never loses its green. Fortune settles into quiet weight.'
        }
      ]
    },
    seasons: {
      meta: { ja: '全4作品 · 各 0.05 WETH', en: '4 works · 0.05 WETH each' },
      works: [
        {
          base: 'images/BONSAI SEASONS/春',
          titleJa: '起・春「息吹」',
          titleEn: 'Ki – Spring: "First Breath"',
          descJa: '黒松。夜明けの霧を透かして、光が斜めに差し込む。まだ何も始まっていないように見えて、枝先のひとつひとつはすでに光を蓄えている。',
          descEn: 'A black pine at daybreak, mist parting before the light. Nothing has begun yet — and still, every branch tip already holds the sun.'
        },
        {
          base: 'images/BONSAI SEASONS/夏',
          titleJa: '承・夏「緑陰」',
          titleEn: 'Sho – Summer: "Green Shade"',
          descJa: '障子越しのやわらかな光が、壁いっぱいに葉影を落とす。夏を語るのは樹そのものではなく、樹が生んだ影と、そのまわりの静かな余白のほうだ。',
          descEn: 'Soft light through shoji scatters leaf-shadows across the wall. What speaks of summer is not the tree itself, but the shade it casts — and the quiet emptiness around it.'
        },
        {
          base: 'images/BONSAI SEASONS/秋',
          titleJa: '転・秋「燃ゆ」',
          titleEn: 'Ten – Autumn: "Ablaze"',
          descJa: '山紅葉。緑だった葉がことごとく色を変え、床にはすでに数枚が落ちている。極まった美しさは、失われはじめる合図でもある。',
          descEn: 'The mountain maple turns. Every leaf that was green has changed, and a few already rest on the floor — beauty at its height is also the signal of its loss.'
        },
        {
          base: 'images/BONSAI SEASONS/冬',
          titleJa: '結・冬「静寂」',
          titleEn: 'Ketsu – Winter: "Stillness"',
          descJa: '五葉松。雪をまとい、色の失せた庭を背に、樹は動かない。四季をひと巡りして最後に残るのは、色ではなく幹と枝の骨格そのものだ。',
          descEn: 'A white pine under snow, motionless against a garden drained of color. After a full turn of the seasons, what remains is not color but the bare architecture of trunk and branch.'
        }
      ]
    },
    cosmos: {
      meta: { ja: '全4作品 · 各 0.05 WETH', en: '4 works · 0.05 WETH each' },
      works: [
        {
          base: 'images/BONSAI COSMOS/誕生',
          titleJa: '起・誕生「ビッグバン」',
          titleEn: 'Ki – Birth: "The Big Bang"',
          descJa: '星雲の渦のただなかで、幹がねじれながら立ち上がる。宇宙が始まったその瞬間から、樹という形はすでに決まっていたのかもしれない。',
          descEn: 'Amid the swirl of a nebula, a trunk rises and twists. Perhaps the shape of a tree was already decided in the first instant of the universe.'
        },
        {
          base: 'images/BONSAI COSMOS/輝き',
          titleJa: '承・輝き「RADIANCE」',
          titleEn: 'Sho – Radiance',
          descJa: '葉の一枚ずつに光が灯り、やがて星々と見分けがつかなくなる。生まれ落ちた形は、ここで最も強く燃える。',
          descEn: 'Light kindles in every leaf until they can no longer be told apart from the stars. Here, the form that was born burns at its brightest.'
        },
        {
          base: 'images/BONSAI COSMOS/静寂',
          titleJa: '転・静寂「SILENCE」',
          titleEn: 'Ten – Silence',
          descJa: '色が引いていく。残るのは星明かりと、剥き出しの岩の上に立つ一本の影だけ。輝きの後に訪れるのは、終わりではなく静けさだ。',
          descEn: 'The color drains away. What remains is starlight and a single silhouette on bare rock — what follows radiance is not an ending, but stillness.'
        },
        {
          base: 'images/BONSAI COSMOS/永遠',
          titleJa: '結・永遠「ETERNITY」',
          titleEn: 'Ketsu – Eternity',
          descJa: '星さえ見えなくなった白い空の下、舎利をさらした幹だけが岩に残る。時間が通り過ぎたあとに残るのは、生きた証としての木肌そのものだ。',
          descEn: 'Under a pale sky where even the stars have gone, only a trunk of bleached deadwood remains on the rock. What outlasts time is the grain of the wood itself.'
        }
      ]
    }
  };

  /* ---------- Language ---------- */

  /* Suffix on data-ja-* / data-en-* -> attribute it drives. */
  var TRANSLATED_ATTRS = { label: 'aria-label', alt: 'alt' };

  function translate(root, lang) {
    root.querySelectorAll('[data-ja][data-en]').forEach(function (el) {
      el.innerHTML = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ja');
    });

    Object.keys(TRANSLATED_ATTRS).forEach(function (suffix) {
      root.querySelectorAll('[data-ja-' + suffix + '][data-en-' + suffix + ']').forEach(function (el) {
        el.setAttribute(
          TRANSLATED_ATTRS[suffix],
          el.getAttribute('data-' + (lang === 'en' ? 'en' : 'ja') + '-' + suffix)
        );
      });
    });
  }

  function applyLang(lang) {
    currentLang = lang === 'en' ? 'en' : 'ja';
    body.classList.remove('lang-ja', 'lang-en');
    body.classList.add('lang-' + currentLang);
    document.documentElement.lang = currentLang;
    translate(document, currentLang);
  }

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  applyLang(saved === 'en' ? 'en' : 'ja');

  toggle.addEventListener('click', function () {
    var next = currentLang === 'ja' ? 'en' : 'ja';
    applyLang(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
  });

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  function closeNav() {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeNav();
  });

  /* ---------- Collection modal ---------- */
  var modal = document.getElementById('collection-modal');
  var grid = document.querySelector('.collection-grid');
  if (!modal || !grid) return;

  var dialog = modal.querySelector('.modal-dialog');
  var elEyebrow = document.getElementById('modal-eyebrow');
  var elTitle = document.getElementById('modal-title');
  var elTagline = document.getElementById('modal-tagline');
  var elMeta = document.getElementById('modal-meta');
  var elBody = document.getElementById('modal-body');
  var elOpenSea = document.getElementById('modal-opensea');
  var closeBtn = modal.querySelector('.modal-close');
  var lastFocused = null;

  function setBilingual(el, ja, en) {
    el.setAttribute('data-ja', ja);
    el.setAttribute('data-en', en);
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function buildWork(work, index) {
    var row = document.createElement('article');
    row.className = 'modal-work';

    var thumb = document.createElement('div');
    thumb.className = 'modal-work-thumb';

    var picture = document.createElement('picture');
    var source = document.createElement('source');
    /* Spaces must be percent-encoded: srcset splits each candidate on
       whitespace, so a raw space would be parsed as a size descriptor. */
    source.setAttribute('srcset', encodeURI(work.base + '.webp'));
    source.setAttribute('type', 'image/webp');

    var img = document.createElement('img');
    img.src = encodeURI(work.base + '.png');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.setAttribute('data-ja-alt', work.titleJa);
    img.setAttribute('data-en-alt', work.titleEn);
    img.alt = work.titleJa;

    picture.appendChild(source);
    picture.appendChild(img);
    thumb.appendChild(picture);

    var text = document.createElement('div');
    text.className = 'modal-work-text';

    var num = document.createElement('p');
    num.className = 'modal-work-num';
    num.textContent = pad(index + 1);

    var title = document.createElement('h3');
    title.className = 'modal-work-title';
    setBilingual(title, work.titleJa, work.titleEn);

    /* The other language, kept visible underneath so both readings show. */
    var subtitle = document.createElement('p');
    subtitle.className = 'modal-work-subtitle';
    setBilingual(subtitle, work.titleEn, work.titleJa);

    var desc = document.createElement('p');
    desc.className = 'modal-work-desc';
    setBilingual(desc, work.descJa, work.descEn);

    text.appendChild(num);
    text.appendChild(title);
    text.appendChild(subtitle);
    text.appendChild(desc);

    row.appendChild(thumb);
    row.appendChild(text);
    return row;
  }

  function buildComingSoon() {
    var wrap = document.createElement('div');
    wrap.className = 'modal-empty';

    var mark = document.createElement('span');
    mark.className = 'modal-empty-mark';
    mark.textContent = '間';

    var text = document.createElement('p');
    text.className = 'modal-empty-text';
    setBilingual(
      text,
      '作品ごとの解説は準備中です。<br>OpenSeaでは全作品をご覧いただけます。',
      'Artwork notes are coming soon.<br>All pieces are viewable on OpenSea.'
    );

    wrap.appendChild(mark);
    wrap.appendChild(text);
    return wrap;
  }

  function render(card) {
    var data = COLLECTIONS[card.getAttribute('data-collection')];
    var num = card.querySelector('.card-num');
    var title = card.querySelector('.card-title');
    var desc = card.querySelector('.card-desc');
    var link = card.querySelector('.card-link');

    elEyebrow.textContent = num ? 'COLLECTION ' + num.textContent.trim() : '';
    elTitle.textContent = title ? title.textContent.trim() : '';

    if (desc) {
      setBilingual(elTagline, desc.getAttribute('data-ja'), desc.getAttribute('data-en'));
    }
    if (link) {
      elOpenSea.href = link.getAttribute('href');
    }

    if (data && data.meta) {
      setBilingual(elMeta, data.meta.ja, data.meta.en);
    } else {
      elMeta.removeAttribute('data-ja');
      elMeta.removeAttribute('data-en');
      elMeta.textContent = '';
    }

    elBody.textContent = '';
    if (data && data.works && data.works.length) {
      data.works.forEach(function (work, i) {
        elBody.appendChild(buildWork(work, i));
      });
    } else {
      elBody.appendChild(buildComingSoon());
    }

    translate(modal, currentLang);
  }

  function focusable() {
    return Array.prototype.filter.call(
      dialog.querySelectorAll('a[href], button:not([disabled])'),
      function (el) { return el.offsetParent !== null; }
    );
  }

  function openModal(card) {
    /* Clicking the card body doesn't move focus anywhere, so activeElement is
       still <body>. Fall back to the card's own trigger, otherwise closing
       would drop focus back to the top of the page. */
    var active = document.activeElement;
    lastFocused = card.contains(active) ? active : card.querySelector('.card-detail');
    render(card);
    modal.classList.add('is-open');
    body.classList.add('modal-open');
    modal.scrollTop = 0;
    closeBtn.focus();
  }

  function closeModal() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
  }

  /* Give every card a keyboard-reachable trigger. Built here rather than in
     the markup so the affordance never shows when the modal can't open. */
  grid.querySelectorAll('.card[data-collection]').forEach(function (card) {
    var link = card.querySelector('.card-link');
    if (!link) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card-detail';
    btn.setAttribute('aria-haspopup', 'dialog');
    setBilingual(btn, '作品を見る →', 'View artworks →');
    card.insertBefore(btn, link);
  });
  translate(grid, currentLang);

  grid.addEventListener('click', function (e) {
    if (e.target.closest('.card-link')) return; // let the OpenSea link through
    var card = e.target.closest('.card[data-collection]');
    if (card) openModal(card);
  });

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-modal-close]')) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key !== 'Tab') return;

    var items = focusable();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (!dialog.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    }
  });
})();
