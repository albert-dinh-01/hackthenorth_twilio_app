const http = require("http");
const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const bodyParser = require("body-parser");
const getQuotesInfo = require("./quotes/fetch_quotes.js");
const app = express();
const port = 1337;
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/sms", (req, res) => {
	const twiml = new MessagingResponse();
	let quoteObjName;
	let quoteObjContent;
	let output;
	input = req.body.Body;

	if (input == "/help" || input == "/Help") {
		output = "This is a help message";
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
	} else {
		output = "This is a generic message";
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
