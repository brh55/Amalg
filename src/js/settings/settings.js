// Saves options to chrome.storage
var save_options = function () {
   var url = document.getElementById('unsubscribe').value;

   chrome.storage.sync.set({
      unsubscribeUrl: url
   }, function () {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
   });
};

document.getElementById('save').addEventListener('click', save_options);
