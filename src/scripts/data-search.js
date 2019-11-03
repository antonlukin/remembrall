(() => {
  const search = document.querySelector('.search');
  const items = document.querySelector('.items');

  // Check if elemets exist
  if (search === null || items === null) {
    return false;
  }

  // Show search block
  search.classList.add('search--visible');

  // Focus search input
  search.focus();

  const updateSearch = () => {
    let value = search.value.toLowerCase();

    if (value.indexOf('#') === 0) {
      value = value.replace(/^#/, '');
    }

    let found = 0;

    search.classList.remove('search--error');

    items.querySelectorAll('.item').forEach((item, i) => {
      let text = item.textContent.toLowerCase();

      if (value && text.indexOf(value) < 0) {
        return item.classList.add('item--hidden');
      }

      found = found + 1;

      return item.classList.remove('item--hidden');
    });

    if (found < 1) {
      search.classList.add('search--error');
    }
  }

  // On hashtag click
  items.querySelectorAll('button[data-hashtag]').forEach((button, i) => {
    // Add button handler
    button.addEventListener('click', () => {
      search.value = '#' + button.dataset.hashtag;

      return updateSearch();
    });
  });

  // Search messages
  search.addEventListener('keyup', updateSearch);
})();