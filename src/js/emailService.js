var GmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&tf=1";
var url = '';

//Open Gmail in new window and inset newsletter template into body of email

var createGmail = function () {
    var body = '';
    var subject = 'Amalg: Newsletter';

    chrome.windows.create({
        url: GmailUrl +
            '&su=' + encodeURIComponent(subject),
        left: 20,
        top: 30,
        width: 700,
        height: 600
    });
};

var updateStorage = function () {
    chrome.storage.local.get('articles', function (result) {
        var currentArticles = result;
        var articleObj = Object.create(currentArticles, {
            articles: {
                value: []
            }
        });
        var tempArticle = helpers.buildArticle();

        articleObj.articles.push(tempArticle);
        chrome.storage.local.set({
            'articles': articleObj
        });
    });
};
