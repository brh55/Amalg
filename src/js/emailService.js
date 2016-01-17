var GmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&tf=1";
var title = '';
var url = '';
var selectedText = '';

var createGmail = function (summary) {
    var body = '';
    var subject = '';
    subject += title;

    if (summary == '') {
        body = url;
    } else {
        body = summary + '\n' + url;
    }

    chrome.windows.create({
        url: GmailUrl +
            '&su=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(body),
        left: 20,
        top: 30,
        width: 700,
        height: 600
    });
};
