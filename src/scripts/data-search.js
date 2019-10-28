(() => {
  const field = document.querySelector('.search');
  const items = document.querySelector('.items');

  // Show search block
  field.classList.add('search--visible');

  // Focus search input
  field.focus();

  const updateField = () => {
    let value = field.value.toLowerCase();

    if (value.indexOf('#') === 0) {
      value = value.replace(/^#/, '');
    }

    let found = 0;

    field.classList.remove('search--error');

    items.querySelectorAll('.item').forEach((item, i) => {
      let text = item.textContent.toLowerCase();

      if (value && text.indexOf(value) < 0) {
        return item.classList.add('item--hidden');
      }

      found = found + 1;

      return item.classList.remove('item--hidden');
    });

    if (found < 1) {
      field.classList.add('search--error');
    }
  }

  // On hashtag click
  items.querySelectorAll('button[data-hashtag]').forEach((button, i) => {
    // Add button handler
    button.addEventListener('click', () => {
      field.value = '#' + button.dataset.hashtag;

      return updateField();
    });
  });

  // Search messages
  field.addEventListener('keyup', updateField);
})();