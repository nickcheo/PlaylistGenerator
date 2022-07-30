const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const client_id="a1c0d6debc2c49038fb8a43eb5df637a"
const client_secret="76669d3b28f94e8da7662d91cc39cc94"
const querystring = require('querystring');
const { URLSearchParams } = require('url');
// let window = require('window')
// let location = require('location')
// let request = require('request');
// const { Client } = require('spotify-api.js');

// cluster.js function import
const clusters = require('./clusters')

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

app.get('/loading2', (req,res) => {
	res.sendFile(path.join(__dirname, '../public', 'loading2.html'));
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
	
	
    const result = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + access_token,
					   'Content-Type' : 'application/json'}
        });

	const data = await result.json()

	let userTopTrackIdList = []
	let idToSongName = {}
	// 2D Array of user song vectors, passable into SK.js libraries
	let userAttributeMatrix = [];

	if (data.items != null)
	{
		for(let i = 0; i < data.items.length; i++)
		{
			var artist = data.items[i].album.artists[0].name;
			userTopTrackIdList[i] = data.items[i].id;
			idToSongName[userTopTrackIdList[i]] = data.items[i].name + " by " + artist;
			// console.log(userTopTrackIdList[i])
		}

		const idQueryString = userTopTrackIdList.join(',');
		// console.log(idQueryString)

		const audioFeaturesResult = await fetch('https://api.spotify.com/v1/audio-features?ids=' + idQueryString, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + access_token,
					   'Content-Type' : 'application/json'}
        });

		const audioFeatureData = await audioFeaturesResult.json();
		// console.log(audioFeatureData)
		console.log('here the items')
		// console.log(audioFeatureData.audio_features[0])

		for(let i = 0; i < audioFeatureData.audio_features.length; i++)
		{
			var feature_dict = audioFeatureData.audio_features[i];
			var songVector = []
			// console.log(feature_dict);

			for(const [key, value] of Object.entries(feature_dict))
				if(typeof(value) === "number" && key != "duration_ms" && key != "duration_ms"
					&& key != "time_signature" && key != 'key')
					{
						// console.log(key, value);
						songVector.push(value);
					}

			userAttributeMatrix.push(songVector);
		}

		var dataStr = "";

		for(let i = 0; i < userTopTrackIdList.length; i++)
		{
			var songId = userTopTrackIdList[i];
			console.log("Data for Song #",i, idToSongName[songId],": ")
			console.log(userAttributeMatrix[i])
			// dataStr += "<p>Data for Song #" + (i+1) + " "+ idToSongName[songId] +": <br>";
			// dataStr+= (userAttributeMatrix[i]) + '</p><br>';
		}
        

		const K = 4;
		
		console.log('done')
		// clusters.printKMeansCentroids(K, userAttributeMatrix);
		const songIdToClusterLabelMap = await clusters.songsToClusters(idToSongName, userTopTrackIdList, userAttributeMatrix, K);
		const clusterGroups  = parseClusterGroups(songIdToClusterLabelMap, idToSongName, K)

		const htmlString = constructClusterHTMLString(clusterGroups);



		res.send(htmlString);
		
		return;

	}

	res.send("something went wrong");


});

function constructClusterHTMLString(clusterGroups)
{
	var html = "<div> "

	for(let i = 0; i < clusterGroups.length; i++)
	{
		html += "<div><h2> Cluster " + (i+1) + "</h2>"
		var cluster = clusterGroups[i];
		for(const song of cluster)
		{
			html += "<p> " + song + "</p>"
		}

		html += "</div>";

	}

	html += '</div>'

	return html;
}


function parseClusterGroups(songIdToClusterLabelMap, songIdToNameMap, k)
{
	let clusterGroups = []
	for(let i = 0; i < k; i++)
		clusterGroups.push([]);

	for(const [id, label] of  Object.entries(songIdToClusterLabelMap))
	{
		clusterGroups[label].push(songIdToNameMap[id]);
	}

	return clusterGroups;

}


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});


