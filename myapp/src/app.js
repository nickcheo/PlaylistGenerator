// not to be confused with PlaylistGenerator/myapp/app.js
// this is for following Vue + Node js setup
console.log("hello")
const express = require('express');
const port = 3000;
const client_id="a1c0d6debc2c49038fb8a43eb5df637a"
const client_secret="76669d3b28f94e8da7662d91cc39cc94"
const cors = require('cors');
const querystring = require('querystring');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.listen(process.env.PORT || 2000)

app.get('/status', (req,res) => {

    res.send({ message: "Hello World!"});
})
