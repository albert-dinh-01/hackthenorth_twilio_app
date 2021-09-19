

const request = require("request");

const getSpaceNews = (callback) => {
	const requestURL = "https://api.spaceflightnewsapi.net/v3/articles?_limit=1";
	request({ url: requestURL, json: true }, (error, response) => {
		var responseData = response.body;
	
        var title = responseData[0].title;
		var url = responseData[0].url;

		var objRet = {
			title: title,
			url: url
		};
		callback(objRet);
	});
};

module.exports = getSpaceNews;