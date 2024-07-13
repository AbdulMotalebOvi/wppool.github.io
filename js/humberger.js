document.getElementById('menu-btn').addEventListener('click', function () {
  var menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});

document.getElementById('close-menu-btn').addEventListener('click', function () {
  var menu = document.getElementById('mobile-menu');
  menu.classList.add('hidden');
});