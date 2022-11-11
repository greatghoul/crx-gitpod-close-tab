function attemptToCloseActiveEditor () {
  try {
    const isWorkbench = document.querySelector("#vscode-workbench-web-configuration");
    const activeTab = document.querySelector(".editor-group-container.active .tab.active");
    if (isWorkbench && activeTab) {
      activeTab.querySelector(".action-item").click();
      return true;
    }
  } catch (e) {}

  return false;
}

function openExtensionShortcutSettings () {
  chrome.tabs.create({
    url: "chrome://extensions/shortcuts"
  });
}

function handleCommand (command, tab) {
  if (command == "close-editor") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: attemptToCloseActiveEditor,
    }, results => {
      // force close the tab on failed
      if (!results || !results[0].result) {
        chrome.tabs.remove(tab.id);
      }
    });
  }
}

chrome.action.onClicked.addListener(openExtensionShortcutSettings);
chrome.commands.onCommand.addListener(handleCommand);
