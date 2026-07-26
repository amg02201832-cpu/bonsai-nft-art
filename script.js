(function () {
  var STORAGE_KEY = 'bonsainftart-lang';
  var body = document.body;
  var toggle = document.getElementById('lang-toggle');

  function applyLang(lang) {
    body.classList.remove('lang-ja', 'lang-en');
    body.classList.add(lang === 'en' ? 'lang-en' : 'lang-ja');
    document.documentElement.lang = lang === 'en' ? 'en' : 'ja';

    document.querySelectorAll('[data-ja][data-en]').forEach(function (el) {
      el.innerHTML = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ja');
    });
  }

  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  applyLang(saved === 'en' ? 'en' : 'ja');

  toggle.addEventListener('click', function () {
    var isJa = body.classList.contains('lang-ja');
    var next = isJa ? 'en' : 'ja';
    applyLang(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
  });

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
})();
