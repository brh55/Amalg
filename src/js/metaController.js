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
