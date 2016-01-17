var GmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&tf=1";
var title = '';
var url = '';
var selectedText = '';

var createGmail = function () {
    var body = '';
    var subject = 'Amalg:Newsletter';
    var retrievedObject = localStorage.getItem('Article');

    chrome.windows.create({
        url: GmailUrl +
            '&su=' + encodeURIComponent(subject),
        left: 20,
        top: 30,
        width: 700,
        height: 600
    });
	
	//DOM body thing
	
};
