const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const client_id="a1c0d6debc2c49038fb8a43eb5df637a"
const client_secret="76669d3b28f94e8da7662d91cc39cc94"
const querystring = require('querystring');
const { URLSearchParams } = require('url');
let window = require('window')
let location = require('location')
let request = require('request');
const { Client } = require('spotify-api.js');




// this can be used as a seperate module
const encodeFormData = (data) => {
	return Object.keys(data)
	  .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
	  .join('&');
  }

// let SpotifyWebApi = require('spotify-web-api-node');
// scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private',
// 'user-read-private', 'user-library-read', 'user-top-read']


// var spotifyApi = new SpotifyWebApi({
// 	clientId: client_id,
// 	clientSecret: client_secret,
// 	redirectUri: 'http://localhost:3000/next',
//   });

// const APIController = (function() {

// 	const _getToken = async () => {

// 		const result = await fetch ('https://accounts.spotify,com/api/token', {

// 			method: 'POST',
// 			headers: {
// 				'Content-Type': "application/x-www-form-urlencoded",
// 				'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
// 			},
// 			body: 'grant_type=client_credentials'
// 		});

// 		const data = await result.json();
// 		return data.access_token;
// 	}
// })();




app.use('/images', express.static(path.join(__dirname, "../images")))


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

app.get('/', (req, res) => {
	// res.send('Hello World!')

	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/testroute', (req, res) =>
{
	
	res.sendFile(path.join(__dirname, '../public', 'genre.html'));
});

app.get('/login', async function(req,res){

	var state = generateRandomString(16);
  	var scope = 'user-read-private user-read-email user-library-read user-top-read';

		  res.redirect('https://accounts.spotify.com/authorize?' +
		    querystring.stringify({
		      response_type: 'code',
		      client_id: client_id,
		      scope: scope,
		      redirect_uri: 'http://localhost:3000/next',
		      state: state
		    }));

});


function handleLoginRedirect(req){
	
	const authCode = req.query.code;

	return authCode;
}

function composeAccessTokenRequest(authCode, req, res)
{
	let refresh_token = req.query.refresh_token;
	let authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
		  code: authCode,
		  redirect_uri: 'http://localhost:3000/next',
		  grant_type: 'authorization_code'
		},
		headers: {
		  'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
		},
		json: true
	  };


	  request.post(authOptions, function(error, response, body) {
		if (!error && response.statusCode === 200) {
		  var access_token = body.access_token;
		  res.send({
			'access_token': access_token
		  });
		}

	});
}


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
				redirect_uri: 'http://localhost:3000/next',
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
	console.log('this that token: ' + access_token)
	// composeAccessTokenRequest(authCode, req, res);

	// var top50Tracks = access_token != "" ? getUserTop50Tracks(access_token) : "something wrong";


	const newToken = refresh('https://accounts.spotify.com/api/token?',authCode, access_token)[0];
	
	console.log('new tok' + newToken)


    const result = await fetch('https://api.spotify.com/v1/me/top/tracks', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + newToken,
					   'Content-Type' : 'application/json'}
        });

	console.log('promise should be done')
	
	




	res.sendFile(path.join(__dirname, '../public', 'intro.html'));

	console.log(result.json())

});


const refresh = async(tokenBaseUrl, authCode, oldToken) => {
	const result = await fetch(tokenBaseUrl, {
		method: 'POST',
		headers: {
			'Content-Type' : "application/x-www-form-urlencoded",
			'Authorization' : 'Basic ' + btoa(client_id + ":" + client_secret)
		},
		body: querystring.stringify({
			grant_type: oldToken,
			code: authCode,
			redirect_uri: 'http://localhost:3000/next',
		})
	});

	const data = result.json();

	return data.access_token;
}

const getUserTop50Tracks = async (access_token) =>
{
	const apiBaseUrl = "https://api.spotify.com/v1/"
	let get50TopTrackUrl = apiBaseUrl +"me/top/tracks?limit=50";
	
	console.log('in get tracks and this the token '  +access_token)
	const result = await fetch(get50TopTrackUrl, {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + access_token,
			'Content-Type' : 'application/json'
		}
	});

	const data = await result.json();


	return data.toString();

	// const result = await fetch(getTokenBaseUrl, {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type' : "application/x-www-form-urlencoded",
	// 		'Authorization' : 'Basic ' + btoa(client_id + ":" + client_secret)
	// 	},
	// 	body: querystring.stringify({
	// 		grant_type: "authorization_code",
	// 		code: authCode,
	// 		redirect_uri: 'http://localhost:3000/next',
	// 	})
	// });
}

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
