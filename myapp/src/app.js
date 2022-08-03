// not to be confused with PlaylistGenerator/myapp/app.js
// this is for following Vue + Node js setup
console.log("hello")
console.log('hello2')
const express = require('express');
const port = 2000;
const client_id="a1c0d6debc2c49038fb8a43eb5df637a"
const client_secret="76669d3b28f94e8da7662d91cc39cc94"
const cors = require('cors');
const querystring = require('querystring');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.listen( port, () => {
	console.log(`Example app listening on port ${port}`);
});




app.get('/status', (req,res) => {

    res.send({ message: "Hello World!"});
})

app.post('/test', (req, res) =>
{
    res.send({
        message: `This is a test message: ${req.body.test}` + req.body.test
    })
});


app.post('/gettracks', async (req,res) =>
{
	
	const token = req.body.token;
	// incoming access token
	console.log('get tracks token is ' + token)

	const result = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token,
					   'Content-Type' : 'application/json'}
        });
	// pls work
	const data = await result.json()

	res.send(data);

});


function generateRandomString(n)
{

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	  }
	  
	str = ""
	for(let i = 0; i < n; i++)
		str += String(getRandomInt(10));

	return str;
}


app.get('/login', async function(req,res){

    console.log('login entereeed')
	var state = generateRandomString(16);
  	var scope = 'user-read-private user-read-email user-library-read user-top-read';

		  res.redirect('https://accounts.spotify.com/authorize?' +
		    querystring.stringify({
		      response_type: 'code',
		      client_id: client_id,
		      scope: scope,
		      redirect_uri: 'http://localhost:2000/next',
		      state: state
		    }));

});


app.get('/next', async (req, res) =>
{
	const authCode = handleLoginRedirect(req);
	const state = req.query.state;
	var access_token = "";
	var refresh_token = ""

	if (state != null)
	{
		const tokenBaseUrl = 'https://accounts.spotify.com/api/token?';
		
		const result = await fetch(tokenBaseUrl, {
			method: 'POST',
			headers: {
				'Content-Type' : "application/x-www-form-urlencoded",
				'Authorization' : 'Basic ' + btoa(client_id + ":" + client_secret)
			},
			body: querystring.stringify({
				grant_type: "authorization_code",
				code: authCode,
				redirect_uri: 'http://localhost:2000/next',
			})
		});

		const data = await result.json();
		console.log("AT: " + data.access_token);
		console.log("SCOPE " + data.scope);
		console.log("EXPIRES_IN: " + data.expires_in)
		console.log("REFRESH TOKEN" + data.refresh_token)

		access_token = data.access_token;
		refresh_token = data.refresh_token;
		
	
	}

	console.log("this the code " + authCode);
	console.log('this that token: ' + access_token);

    res.send({
        'access_token': access_token
    });
});