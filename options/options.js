function saveOptions(e) {
  chrome.storage.local.set({
    fontHelpPopin: document.querySelector("#font-help-popin").checked
  });
  chrome.storage.local.set({
	fontSizeChange: document.querySelector("#font-size-change").value
  });
}

function restoreOptions() {
  chrome.storage.local.get('fontHelpPopin', (res) => {
    document.querySelector("#font-help-popin").checked = res.fontHelpPopin || '';
  });
  chrome.storage.local.get('fontSizeChange', (res) => {
    document.querySelector("#font-size-change").value = res.fontSizeChange || '';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);