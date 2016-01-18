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

/**
 * Reference to chrome.storage.sync
 * @type {object}
 */
var storage = chrome.storage.sync;

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
		console.log(metaArray);
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
		var title = helpers.getMetaContent('title') || '';
		var link = window.location.href;
		var author = helpers.getMetaContent('author') || '';
		var image = helpers.getMetaContent('thumbnail') || '';

		var tempArticle = Object.create(articleModel, {
			title: {
				value: title
			},
			description: {
				value: helpers.getDescription()
			},
			link: {
				value: link
			},
			author: {
				value: author
			},
			image: {
				value: image
			}
		});
		console.log(tempArticle);
		return tempArticle;
	},

	/**
	 * Takes in a new Article and passes it to storage
	 * @param  {object} newArticle Article containing metaData
	 */
	updateStorage: function (newArticle) {
		console.log('Activated Storage: ' + newArticle);
	    storage.get('articles', function (result) {
	        var currentArticles = result;
	        console.log('the result is' + result);
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
	}
};
