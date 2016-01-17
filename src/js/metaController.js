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

	getMetaContent: function (var_name) {
		var code = 'var meta = document.querySelector("meta[name=\''+var_name+'\']");' + 
           'if (meta) meta = meta.getAttribute("content");' +
           '({' +
           '    title: document.title,' +
           '    description: meta || ""' +
           '});';
		chrome.tabs.executeScript({
		code: code
		}, function(results) {

		var result = results[0];
        return result.description;
	});
	return 0;
	}

	/**
	 * Build article object
	 */
	buildArticle: function () {
		var tempArticle = Object.create(articleModel, {
			title: {
				value: getMetaContent('twitter:title')
			},
			summary: {
				value:  getMetaContent('twitter:description')
			},
			link: {
				value: getMetaContent('twitter:domain')
			},
			author: {
				value: getMetaContent('twitter:creator')
			},
			image: {
				value: getMetaContent('twitter:image:src')
			}
		});

		return tempArticle;
	}