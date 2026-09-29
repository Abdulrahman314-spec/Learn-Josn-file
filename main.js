document.addEventListener('DOMContentLoaded', function () {

  // 1) Sidebar active-link highlighting on scroll
  var links = document.querySelectorAll('.sidebar nav a');
  var sections = Array.prototype.map.call(links, function (a) {
    return document.querySelector(a.getAttribute('href'));
  });
  function onScroll() {
    var pos = window.scrollY + 120;
    var current = 0;
    sections.forEach(function (sec, i) {
      if (sec && sec.offsetTop <= pos) current = i;
    });
    links.forEach(function (a, i) {
      a.classList.toggle('active', i === current);
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // 2) Live JSON validator
  var input = document.getElementById('jsonInput');
  var status = document.getElementById('jsonStatus');
  var prettyBtn = document.getElementById('prettyBtn');

  function validate() {
    try {
      var parsed = JSON.parse(input.value);
      status.textContent = 'Valid JSON';
      status.classList.remove('invalid');
      return parsed;
    } catch (err) {
      status.textContent = 'Invalid: ' + err.message;
      status.classList.add('invalid');
      return null;
    }
  }

  if (input) {
    input.addEventListener('input', validate);
    validate();
  }

  if (prettyBtn) {
    prettyBtn.addEventListener('click', function () {
      var parsed = validate();
      if (parsed !== null) {
        input.value = JSON.stringify(parsed, null, 2);
      }
    });
  }
});
