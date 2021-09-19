// Albert Dinh (September 2021)
// Courtesy of the quotation data base: https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373
// return a quote and its author every request

const request = require("request");

const getQuotesInfo = (callback) => {
	const requestURL = "https://type.fit/api/quotes";
	request({ url: requestURL, json: true }, (error, response) => {
		var responseData = response.body;
		// need the length of the body to generate random number
		var maxLengthData = responseData.length - 1;
		const minIndex = 0;
		var randomIndex = Math.floor(
			Math.random() * (maxLengthData - minIndex + 1) + minIndex
		);
		var content = responseData[randomIndex].text;
		var author = responseData[randomIndex].author;
		var objRet = {
			content: content,
			author: author
		};
		callback(objRet);
	});
};

module.exports = getQuotesInfo;