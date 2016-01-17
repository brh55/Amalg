document.addEventListener('DOMContentLoaded', function() {
	// Send message to the current tab
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		// since only one tab should be active and in the current window at once
		// the return variable should only have one entry
		var tab = tabs[0];
		var msg;
	});
});

//Detect click and amalgamate newsletter in local storage
chrome.extension.onRequest.addListener(
  function(connectionInfo) {
    // Push to local storage
    var article = helpers.buildArticle();
	localStorage.setItem('Article', JSON.stringify(article));
});


