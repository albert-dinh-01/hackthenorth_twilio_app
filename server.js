const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const quotes = require("./quotes/fetch_quotes.js")
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  input = req.body.Body
  console.log(input);

  if (input == '/help' || input == '/Help') {
    output = "This is a help message";
  }
  else {
    output = "this is a generic message";
  }
  
  console.log(input + "   " + output);
  twiml.message(output);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
