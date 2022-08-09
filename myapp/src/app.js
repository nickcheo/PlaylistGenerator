// not to be confused with PlaylistGenerator/myapp/app.js
// this is for following Vue + Node js setup
console.log('hello')
console.log('hello2')
const express = require('express')
const port = 2000
const client_id = 'a1c0d6debc2c49038fb8a43eb5df637a'
const client_secret = '76669d3b28f94e8da7662d91cc39cc94'
const cors = require('cors')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const clusters = require('../clusters')
const fetch = require('cross-fetch')
// const { MinPriorityQueue} = require('@datastructures-js/priority-queue');

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

app.get('/status', (req, res) => {
	res.send({ message: 'Hello World!' })
})

app.post('/test', (req, res) => {
	res.send({
		message: `This is a test message: ${req.body.test}` + req.body.test,
	})
})
app.post('/getprofile', async (req, res) => {
	const token = req.body.token
	console.log('get profile token is ' + token)

	const result = await fetch('https://api.spotify.com/v1/me', {
		method: 'GET',
		headers: {Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
	})

	let response = {}
	let profileURLs = []

	

	const data = await result.json()

	res.send(data)

	console.log('nick6')
	console.log(data.images[0].url)

	response['pfp'] = profileURLs

	res.send(JSON.stringify(response))
})
app.post('/gettracks', async (req, res) => {
	const token = req.body.token
	// incoming access token
	console.log('get tracks token is ' + token)

	const result = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
	})
	// pls work
	const data = await result.json()

	res.send(data)
})

app.post('/gettopcovers', async (req, res) => {
	const token = req.body.token
	console.log('this that token: ' + token)

	const result = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp?si=d2de65961e964ab2/', {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
	})

	let response = {}
	let ImageURLs = []

	const data = await result.json()

	if (data.tracks != null) {
		for (let i = 0; i < 50; i++) {
			ImageURLs.push(data.tracks.items[i].track.album.images[0].url)
		}
	}

	console.log('nick4')
	console.log(data.tracks.items[0].track.album.images)

	// remove duplicates
	uniqueImageURLs = [...new Set(ImageURLs)]

	response['ImageURLs'] = uniqueImageURLs
	res.send(JSON.stringify(response))
})

app.post('/gettopartists', async (req, res) => {
	const token = req.body.token
	console.log('this that token: ' + token)

	const playlistResult = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp?si=d2de65961e964ab2/', {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
	})

	let response = {}
	let ImageURLs = []
	let artistsIDs = []

	const playlistData = await playlistResult.json()

	if (playlistData.tracks != null) {
		for (let i = 0; i < 50; i++) {
			let artistID = playlistData.tracks.items[i].track.artists[0].id
			if (!artistsIDs.includes(artistID)) {
				artistsIDs.push(artistID)
			}
		}
	}

	const artistsResult = await fetch(`https://api.spotify.com/v1/artists?ids=${artistsIDs.join(',')}`, {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
	})

	const artistsData = await artistsResult.json()

	for (let artist of artistsData.artists) {
		ImageURLs.push(artist.images[0].url)
	}

	// remove duplicates
	uniqueImageURLs = [...new Set(ImageURLs)]

	response['ImageURLs'] = uniqueImageURLs
	res.send(JSON.stringify(response))
})

app.post('/getclusters', async (req, res) => {
	const token = req.body.token

	console.log('this that token: ' + token)

	const result = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
	})

	const data = await result.json()
	console.log('Hello Kathir')
	// console.log(data.items[0].album.images[0].url);

	let IDtoImageURL = {}
	let userTopTrackIdList = []
	let idToSongName = {}
	// 2D Array of user song vectors, passable into SK.js libraries
	let userAttributeMatrix = []

	if (data.items != null) {
		for (let i = 0; i < data.items.length; i++) {
			var artist = data.items[i].album.artists[0].name
			userTopTrackIdList[i] = data.items[i].id
			idToSongName[userTopTrackIdList[i]] = data.items[i].name + ' by ' + artist
			IDtoImageURL[userTopTrackIdList[i]] = data.items[i].album.images[0].url
			// console.log(userTopTrackIdList[i])
		}
		console.log('testNick')
		console.log(IDtoImageURL)

		const idQueryString = userTopTrackIdList.join(',')
		// console.log(idQueryString)

		const audioFeaturesResult = await fetch('https://api.spotify.com/v1/audio-features?ids=' + idQueryString, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
		})

		const audioFeatureData = await audioFeaturesResult.json()
		// console.log(audioFeatureData)
		console.log('here the items')
		// console.log(audioFeatureData.audio_features[0])

		for (let i = 0; i < audioFeatureData.audio_features.length; i++) {
			var feature_dict = audioFeatureData.audio_features[i]
			var songVector = []
			// console.log(feature_dict);

			for (const [key, value] of Object.entries(feature_dict))
				if (typeof value === 'number' && key != 'duration_ms' && key != 'duration_ms' && key != 'time_signature' && key != 'key') {
					// console.log(key, value);
					songVector.push(value)
				}

			userAttributeMatrix.push(songVector)
		}

		for (let i = 0; i < userTopTrackIdList.length; i++) {
			var songId = userTopTrackIdList[i]
			console.log('Data for Song #', i, idToSongName[songId], ': ')
			console.log(userAttributeMatrix[i])
		}

		const K = 4

		console.log('done')
		// clusters.printKMeansCentroids(K, use rAttributeMatrix);
		const songIdToClusterLabelMap = await clusters.songsToClusters(idToSongName, userTopTrackIdList, userAttributeMatrix, K)
		const clusterGroups = parseClusterGroups(songIdToClusterLabelMap, idToSongName, K)
		const centroids = await clusters.getCentroids(K, userAttributeMatrix)
		let response = {}
		response['songIdToClusterLabelMap'] = songIdToClusterLabelMap
		response['clusterGroups'] = clusterGroups
		response['songIdList'] = userTopTrackIdList
		response['songIdToName'] = idToSongName
		response['idAndImage'] = IDtoImageURL
		response['centroids'] = centroids

		response['clustersBestTwoSongs'] = computeClosestSongsToCentroids(
			centroids,
			songIdToClusterLabelMap,
			userTopTrackIdList,
			userAttributeMatrix
		)

		res.send(JSON.stringify(response))
	}
})

function parseClusterGroups(songIdToClusterLabelMap, songIdToNameMap, k) {
	let clusterGroups = []
	for (let i = 0; i < k; i++) clusterGroups.push([])

	for (const [id, label] of Object.entries(songIdToClusterLabelMap)) {
		clusterGroups[label].push(songIdToNameMap[id])
	}

	return clusterGroups
}

function computeClosestSongsToCentroids(centroids, songIdToClusterLabelMap, idList, matrix) {
	// maintain priority queue of points for each cluster
	let clusterDistances = []
	for (let i = 0; i < centroids.length; i++) clusterDistances.push([])

	function _squareDistance(a, b) {
		let sum = 0
		for (let j = 0; j < a.length; j++) sum += (a[j] - b[j]) ** 2

		return sum
	}

	for (let i = 0; i < idList.length; i++) {
		let id = idList[i]
		let label = songIdToClusterLabelMap[id]
		// make pair of id and distance to it's associated centroid
		// compute square distance of song data point to its associated cluster
		let idDistPair = { id: idList[i], dist: _squareDistance(matrix[i], centroids[label]) }
		clusterDistances[label].push(idDistPair)
	}

	for (let i = 0; i < centroids.length; i++)
		clusterDistances[i].sort((a, b) => {
			return a['dist'] - b['dist']
		})

	let clustersTopTwoSongIds = []
	for (let i = 0; i < centroids.length; i++) {
		// get two songs with closest distance
		const firstId = clusterDistances[i][0]['id']
		const secondId = clusterDistances[i][1]['id']
		clustersTopTwoSongIds[i] = [firstId, secondId]
	}

	return clustersTopTwoSongIds
}

function generateRandomString(n) {
	function getRandomInt(max) {
		return Math.floor(Math.random() * max)
	}

	str = ''
	for (let i = 0; i < n; i++) str += String(getRandomInt(10))

	return str
}

// app.get('/next', async (req, res) =>
// {
// 	const authCode = handleLoginRedirect(req);
// 	const state = req.query.state;
// 	var access_token = "";
// 	var refresh_token = ""

// 	if (state != null)
// 	{
// 		const tokenBaseUrl = 'https://accounts.spotify.com/api/token?';

// 		const result = await fetch(tokenBaseUrl, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type' : "application/x-www-form-urlencoded",
// 				'Authorization' : 'Basic ' + btoa(client_id + ":" + client_secret)
// 			},
// 			body: querystring.stringify({
// 				grant_type: "authorization_code",
// 				code: authCode,
// 				redirect_uri: 'http://localhost:2000/next',
// 			})
// 		});

// 		const data = await result.json();
// 		console.log("AT: " + data.access_token);
// 		console.log("SCOPE " + data.scope);
// 		console.log("EXPIRES_IN: " + data.expires_in)
// 		console.log("REFRESH TOKEN" + data.refresh_token)

// 		access_token = data.access_token;
// 		refresh_token = data.refresh_token;

// 	}

// 	console.log("this the code " + authCode);
// 	console.log('this that token: ' + access_token);

//     res.send({
//         'access_token': access_token
//     });
// });
