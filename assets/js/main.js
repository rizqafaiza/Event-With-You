(function () {
  var links = document.querySelectorAll('[data-nav]');
  var layanan = document.getElementById('layanan');
  if (!layanan) return; // halaman lain tanpa section layanan
  function setActive(id) {
    links.forEach(function (a) {
      var on = a.dataset.nav === id;
      a.classList.toggle('underline', on);
      if (on) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }
  function onScroll() {
    setActive(layanan.getBoundingClientRect().top <= 120 ? 'layanan' : 'beranda');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
