// Albert Dinh (2021)
// Data set courtesy belongs to: https://api.opencovid.ca

const request = require("request");

const COVIDData = (callback) => {
	const requestURL = "https://api.opencovid.ca";
	request({ url: requestURL, json: true }, (error, response) => {
		var responseData = response.body.summary[0];
		var activeCases = responseData.active_cases;
		var totalPeopleFullyVaccinated = responseData.cumulative_cvaccine;
		var date = responseData.date;
		var objRet = {
			activeCases: activeCases,
			totalPeopleFullyVaccinated: totalPeopleFullyVaccinated,
			date: date
		};
		callback(objRet);
	});
};

module.exports = COVIDData;
