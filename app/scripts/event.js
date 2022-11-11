function openExtensionShortcutSettings () {
  chrome.tabs.create({
    url: "chrome://extensions/shortcuts"
  });
}

chrome.action.onClicked.addListener(openExtensionShortcutSettings);
