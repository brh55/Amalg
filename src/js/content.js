chrome.runtime.sendMessage({
    from:    'content',
    subject: 'showPageAction'
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if ((msg.from === 'popup')
        && (msg.subject === 'DOMInfo')) {

        var domInfo = helpers.buildArticle();

        if (domInfo) {
            sendResponse(domInfo);
            return true;
        }
    }
});
