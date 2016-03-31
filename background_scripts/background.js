
chrome.browserAction.onClicked.addListener(function(tab) {
  var chosenBeastURL = chrome.extension.getURL("fonts/anquietas.ttf");

  chrome.tabs.executeScript(null, {
    file: "/content_scripts/font_changes.js"
  });

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {beastURL: chosenBeastURL});
  });
});
