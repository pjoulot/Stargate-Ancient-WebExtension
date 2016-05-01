function saveOptions(e) {
  chrome.storage.local.set({
    fontHelpPopin: document.querySelector("#font-help-popin").checked
  });
  chrome.storage.local.set({
	fontSizeChange: document.querySelector("#font-size-change").value
  });
  chrome.storage.local.set({
	removeSpecialCharacters: document.querySelector("#remove-special-characters").checked
  });
}

function restoreOptions() {
  chrome.storage.local.get('fontHelpPopin', (res) => {
    document.querySelector("#font-help-popin").checked = res.fontHelpPopin || '';
  });
  chrome.storage.local.get('fontSizeChange', (res) => {
    document.querySelector("#font-size-change").value = res.fontSizeChange || '';
  });
  chrome.storage.local.get('removeSpecialCharacters', (res) => {
    document.querySelector("#remove-special-characters").checked = res.removeSpecialCharacters || '';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);