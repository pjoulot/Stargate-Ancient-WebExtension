var enable = 1;

//local could be change by sync when Firefox will have implemented it
chrome.storage.local.get('stargate-ancient-font', function (obj) {
  if(typeof obj['stargate-ancient-font'] != 'undefined') {
    enable = obj['stargate-ancient-font'];
  }
});

//Apply the display changes each time the tab is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(enable) {
    var fontURLValue = chrome.extension.getURL("fonts/anquietas.ttf");
    var popupCssURLValue = chrome.extension.getURL("css/popup.css");
    var popinIconURLValue = chrome.extension.getURL("images/icon-stargate.png");

    chrome.tabs.executeScript(null, {
      file: "/content_scripts/font_changes.js"
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {fontURL: fontURLValue, popupCssURL: popupCssURLValue, popinIconURL: popinIconURLValue});
    });
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  enable = (enable + 1) % 2;
  chrome.storage.local.set({'stargate-ancient-font': enable}, function() {});
  //Reload the current tab to apply changes
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
});
