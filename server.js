const http = require("http");
const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const bodyParser = require("body-parser");
const getQuotesInfo = require("./quotes/fetch_quotes.js");
const COVIDData = require("./covid19/covid19");
const app = express();
const port = 1337;
app.use(bodyParser.urlencoded({ extended: false }));

// code starts here
app.post("/sms", (req, res) => {
	const twiml = new MessagingResponse();
	let quoteObjName;
	let quoteObjContent;
	let output;
	input = String(req.body.Body).trim();

	if (input == "/help" || input == "/Help") {
		output =
			"Available commands include:\n\n/quotes: randomly generated quotes\n\n/help: showing available commands";
		refactoredTwilio(twiml, output, res);
	}
	// this is the conditional for the quote part
	else if (input == "/quotes") {
		getQuotesInfo(({ content, author }) => {
			quoteObjContent = content;
			quoteObjName = author;

			// deal with quote without author(s)
			if (quoteObjName == null) {
				quoteObjName = "No name";
			}

			output = String(
				"(" + String(quoteObjName) + ") " + String(quoteObjContent)
			);
			refactoredTwilio(twiml, output, res);
		});
	}
	// COVID19 basic data
	else if (input == "/covid19") {
		COVIDData(({ activeCases, totalPeopleFullyVaccinated, date }) => {
			output = String(
				"On date: " +
					String(date) +
					"\n\n" +
					"The number of active COVID19 cases in Canada is: " +
					String(activeCases) +
					" cases.\n\n" +
					"The total number of people who have been fully vaccinated is: " +
					String(totalPeopleFullyVaccinated) +
					" doses."
			);
			refactoredTwilio(twiml, output, res);
		});
	}
	// handling the users' mistakes
	else {
		output =
			"This is not a valid command. Please consult the following list of commands: \n\n/quotes: randomly generated quotes\n\n/help: showing available commands";
		refactoredTwilio(twiml, output, res);
	}
});

const refactoredTwilio = (tm, output, res) => {
	tm.message(output);
	res.writeHead(200, { "Content-Type": "text/xml" });
	res.end(tm.toString());
};

http.createServer(app).listen(port, () => {
	console.log("Express server listening on port", port);
});

// This is for actually killing the port after using CTRL-C
process.on("SIGINT", function () {
	console.log("\nGracefully shutting down from SIGINT (Ctrl-C)!");
	process.exit(1);
});
