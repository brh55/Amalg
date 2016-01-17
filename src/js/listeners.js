document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('createnewsletterButton').addEventListener('click', createGmail);
});

window.onload = function() {
 
	// Push to local storage
    var article = helpers.buildArticle();
	localStorage.setItem('Article', JSON.stringify(article));
	
	
}