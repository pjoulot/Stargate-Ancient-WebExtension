function saveOptions(e) {
  chrome.storage.local.set({
    fontHelpPopin: document.querySelector("#font-help-popin").checked
  });
}

function restoreOptions() {
  chrome.storage.local.get('fontHelpPopin', (res) => {
    document.querySelector("#font-help-popin").checked = res.fontHelpPopin || '';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);