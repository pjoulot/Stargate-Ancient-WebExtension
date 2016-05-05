var enable = 1;

//local could be change by sync when Firefox will have implemented it
chrome.storage.local.get('stargateAncientFont', function (obj) {
  if(typeof obj['stargateAncientFont'] != 'undefined') {
    enable = obj['stargateAncientFont'];
  }
  updateAddonIcon();
});



//Apply the display changes each time the tab is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var url = tab.url;
  // The test on changeInfo.status is needed to avoid injecting multiple popin.
  // Maybe separate font change and popin because we could have to apply font changes with ajax calls.
  if (url !== undefined && changeInfo.status == "complete" && enable) {
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
  chrome.storage.local.set({'stargateAncientFont': enable}, function() {});
  //Reload the current tab to apply changes
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
  updateAddonIcon();
});

function updateAddonIcon() {
  chrome.browserAction.setIcon({
    path: enable ? {
      19: "icons/icon-19.png",
      38: "icons/icon-38.png"
    } : {
      19: "icons/icon-19-disabled.png",
      38: "icons/icon-38-disabled.png"
    }
  });
}
