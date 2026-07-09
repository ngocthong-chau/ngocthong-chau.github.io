(function () {
  var cards = document.querySelectorAll('.flip-card');

  cards.forEach(function (card) {
    var inner = card.querySelector('.flip-inner');
    var front = card.querySelector('.flip-front');
    var back = card.querySelector('.flip-back');
    if (!inner || !front || !back) return;

    function setHeight() {
      var target = card.classList.contains('is-flipped') ? back : front;
      inner.style.height = target.offsetHeight + 'px';
    }

    function toggle(e) {
      if (e.target.closest('.acr')) return;
      var flipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(flipped));
      setHeight();
    }

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        if (e.target.closest('.acr')) return;
        e.preventDefault();
        toggle(e);
      }
    });

    window.addEventListener('resize', setHeight);
    setHeight();
  });
})();
