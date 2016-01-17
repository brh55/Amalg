

//Detect click and amalgamate newsletter in local storage
chrome.extension.onRequest.addListener(
  function() {
    // Push to local storage
   // var article = helpers.buildArticle();
	//localStorage.setItem('Article', JSON.stringify(article));
	createGmail();
	console.log("Test whatever");
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('createnewsletterButton').addEventListener('click', createGmail);
});