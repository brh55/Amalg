// Main meta files fetched here
var model = {
	meta: [],
	images: [],
};

/**
 * Article Schema for Newsletter
 * @type {Object}
 */
var articleModel = {
	title: '',
	summary: '',
	link: '',
	author: ''
};

var helpers = {
	/**
	 * Wrapper to return current URL
	 * @return {string} String of current url
	 */
	getCurrentUrl: function () {
		console.log('hi');
		return window.location.href;
	},

	/**
	 * Returns and updates model with Meta data
	 * @return {object} Model contains Meta data of document
	 */
	fetchMetaData: function () {
		model.meta = document.getElementsByTagName('meta');
	},

	/**
	 * Returns and updates existing model of images
	 * @return {object} Image updated into global model
	 */
	fetchImages: function () {
		model.images = document.getElementsByTagName('img');
		console.log(model);
	}
};

helpers.fetchMetaData();
helpers.fetchImages();
