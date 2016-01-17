document.addEventListener('DOMContentLoaded', function() {
	// Send message to the current tab
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		// since only one tab should be active and in the current window at once
		// the return variable should only have one entry
		var tab = tabs[0];
		var msg;
	});
});

var GmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&tf=1";
var title = '';
var url = '';
var selectedText = '';

chrome.extension.onRequest.addListener(
  function(connectionInfo) {
    selectedText = connectionInfo;
    makeGmailWin(selectedText);
});

// From = <whatever gmail account is logged in;
//         If not logged in, redirects to login page>
// To = <Unfilled>
// Subject = [Interesting Page] <Page's Title>
// Body = Summary Selection + URL

chrome.browserAction.onClicked.addListener(
  function(tab) {
    chrome.tabs.executeScript(null, {file: "infopasser.js"});
    title = tab.title;
    url = tab.url;
});

function makeGmailWin(summary) {
  var body = '';
  var subject = "";
  subject += title;
  if (summary == '') {
    body = url;
  } else {
    body = summary + "\n" + url;
  }
  chrome.windows.create({
    url: GmailUrl +
                 "&su=" + encodeURIComponent(subject) +
                 "&body=" + encodeURIComponent(body),
    left: 20,
    top: 30,
    width: 700,
    height: 600
    });
}
