

//Detect click and amalgamate newsletter in local storage
chrome.extension.onRequest.addListener(
  function(connectionInfo) {
    // Push to local storage
    var article = helpers.buildArticle();
	localStorage.setItem('Article', JSON.stringify(article));
});


