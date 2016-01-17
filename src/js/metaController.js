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
	buildArticle: function (tab) {
		var tempArticle = Object.create(articleModel, {
			title: {
				value: helpers.getMetaContent('title') || tab.title || ''
			},
			description: {
				value: helpers.getDescription()
			},
			link: {
				value: tab.url || window.location.href
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
