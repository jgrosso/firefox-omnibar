browser.omnibox.setDefaultSuggestion({
  description: 'Site search (e.g. "omni wiki Some Wikipedia search" | "omni google Some Google search")'
});

browser.omnibox.onInputEntered.addListener((text, disposition) => {
  let url = text;

  const prefix = 'wiki';
  if (text.startsWith(prefix)) {
    const query = text.substring(prefix.length + 1);
    url = `https://en.wikipedia.org/wiki/${query}`;
  }

  console.log(`Navigating to ${url}`);

  switch (disposition) {
    case 'currentTab':
      browser.tabs.update({ url });
      break;
    case 'newForegroundTab':
      browser.tabs.create({ url });
      break;
    case 'newBackgroundTab':
      browser.tabs.create({ active: false, url });
      break;
    default:
      break;
  }
});
