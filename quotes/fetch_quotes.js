// return a quote and its author every request

const request = require("request");
const requestURL = "https://type.fit/api/quotes";

request({ url: requestURL }, (error, response) => {
	const responseData = JSON.parse(response.body);
	const textContent = responseData[0].text;
	const author = responseData[0].author;
});
