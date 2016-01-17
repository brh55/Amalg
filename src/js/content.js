/**
 * Article Schema for Newsletter
 * @type {Object}
 */
var articleModel = {
  title: '',
  summary: '',
  link: '',
  author: '',
  image: ''
};

var helpers = {
  /**
   * Returns and updates model with Meta data
   * @return {object} Model contains Meta data of document
   */
  fetchMetaData: function () {
    return document.getElementsByName('meta');
  },

  getMetaContent: function (name) {
    var metaArray = document.getElementsByName(name);
    if (metaArray.length > 0) {
      return metaArray[0].content;
    }

    return false;
  },

  /**
   * Returns and updates existing model of images
   * @return {object} Image updated into global model
   */
  fetchImages: function () {
    return document.getElementsByTagName('img');
  },

  /**
   * Return Description
   */
  getDescription: function () {
    var description = document.getElementsByName('description') ||
              document.getElementsByName('abstract') ||
              document.getElementsByName('summary');

    if (description.length > 0) {
      return description[0].content;
    } else {
      return 'Description not available.';
    }
  },

  /**
   * Build article object
   */
  buildArticle: function () {
    var tempArticle = Object.create(articleModel, {
      title: {
        value: helpers.getMetaContent('title') || ''
      },
      description: {
        value: helpers.getDescription()
      },
      link: {
        value: window.location.href
      },
      author: {
        value: helpers.getMetaContent('author') || ''
      },
      image: {
        value: helpers.getMetaContent('thumbnail') || ''
      }
    });
    return tempArticle;
  }
};

var updateStorage = function (tab) {
    chrome.storage.local.get('articles', function (result) {
        var currentArticles = result;
        var articleObj = Object.create(currentArticles, {
            articles: {
                value: ['test']
            }
        });
        var tempArticle = helpers.buildArticle(tab);

        articleObj.articles.push(tempArticle);
        chrome.storage.local.set({
            'articles': articleObj
        });
    });
};

var updateStorageNews = function (newArticle) {
  console.log('test');
  console.log(newArticle);
    chrome.storage.local.get('articles', function (result) {
        var currentArticles = result;
        var articleObj = {
          articles: []
        };

        articleObj.articles.push(newArticle);
        chrome.storage.local.set(articleObj);
        console.log('successfully updated local');
    });
};

// Inform the background page that 
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data 
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var domInfo = helpers.buildArticle();
    updateStorage();

    // Directly respond to the sender (popup), 
    // through the specified callback */
    updateStorageNews(domInfo);
    response(domInfo);
  }
});
