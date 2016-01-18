// Load Listerners on extension
document.addEventListener('DOMContentLoaded', function (tab) {

    document.getElementById('createnewsletterButton').addEventListener('click', createGmail);

    chrome.tabs.query({
        active: true,
        currentWindow: true
    },
    function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                from: 'popup',
                subject: 'DOMInfo'
            },
            function(response) {
                if (chrome.runtime.lastError) {
                    // An error occurred :(
                    console.log("ERROR: ", chrome.runtime.lastError);
                } else {
                    console.log(response)
                    helpers.updateStorage(response)
                }
            }
        );
    });
});

