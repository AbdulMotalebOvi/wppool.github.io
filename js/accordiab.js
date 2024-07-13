function activateButton(button) {
    const buttons = document.querySelectorAll('.flex.items-center > button');
    buttons.forEach(btn => {
      btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
      btn.classList.add('bg-transparent', 'text-gray-700');
    });
    button.classList.remove('bg-transparent', 'text-gray-700');
    button.classList.add('bg-blue-600', 'text-white', 'shadow-md');
  }
  