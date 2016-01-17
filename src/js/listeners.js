
var updateStorageNews = function (newArticle) {
	console.log(newArticle);
    chrome.storage.local.get('articles', function (result) {
        var currentArticles = result;
        var articleObj = Object.create(currentArticles, {
            articles: {
                value: []
            }
        });
        console.log(articleObj);
        articleObj.articles.push(newArticle);
        chrome.storage.local.set(articleObj);
        console.log('successfully updated local');
    });
};

function setDOMInfo(info, info2, info3) {
	console.log(info);
	console.log(info2);
}

// Load Listerners on extension
document.addEventListener('DOMContentLoaded', function (tab) {
    document.getElementById('createnewsletterButton').addEventListener('click', createGmail);
    updateStorage(tab);

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script)
        setDOMInfo);
  });
});

