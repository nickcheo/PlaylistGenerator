// not to be confused with PlaylistGenerator/myapp/app.js
// this is for following Vue + Node js setup
// heroku build
console.log('hello')
const path = require('path')
const express = require('express')
const port = process.env.PORT || 2000
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

const pathy = __dirname + '/../../client/dist'

// app.use(express.static(pathy))

app.get('/', function (req, res) {
	res.sendFile(pathy + 'index.html')
})

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
		headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
	})

	try {
		let response = {}
		let profileURL = ''
		let userID = ''

		const data = await result.json()

		// console.log('nick6')
		// console.log(data.images[0].url)

		// if no profile pic exist, default to spotify logo as referenced from components
		profileURL = data.images[0] != null ? data.images[0].url : '../assets/spotify-icon-2.png'
		userID = data.id
		const userPlaylist = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
			method: 'POST',
			headers: { Authorization: 'Bearer' + token, 'Content-Type': 'application/json' },
			data: { name: 'New Playlist', description: 'Test Description', public: true },
		})

		const createPlaylist = await userPlaylist.json()
		console.log('nick100')
		console.log(createPlaylist)
		console.log('nick6')

		response['pfp'] = profileURL

		res.send(JSON.stringify(response))
	} catch (error) {
		console.log(error)
	}
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
	// console.log(data.tracks.items[0].track.album.images)

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
	console.log('Hello this where the tracks at')
	console.log(data.items[0])

	let IDtoImageURL = {}
	let userTopTrackIdList = []
	let idToSongName = {}
	let songIdToArtistId = {}
	let artistIdToGenre = {}
	// 2D Array of user song vectors, passable into SK.js libraries
	let userAttributeMatrix = []

	if (data.items != null) {
		for (let i = 0; i < data.items.length; i++) {
			var artist = data.items[i].artists[0].name
			userTopTrackIdList[i] = data.items[i].id
			idToSongName[userTopTrackIdList[i]] = data.items[i].name + ' by ' + artist
			IDtoImageURL[userTopTrackIdList[i]] = data.items[i].album.images[0].url
			songIdToArtistId[userTopTrackIdList[i]] = data.items[i].artists[0].id
		}
		console.log('testNick')
		console.log(IDtoImageURL)

		const idQueryString = userTopTrackIdList.join(',')
		let artistIdQueryString = ''
		for (const [key, value] of Object.entries(songIdToArtistId)) artistIdQueryString += value + ','
		artistIdQueryString = artistIdQueryString.slice(0, -1)

		console.log(artistIdQueryString)
		console.log('length: ' + artistIdQueryString.split(',').length)

		// ISSUE: when querying genres for a song, the "genres" object is an array of genre text fields,
		// but this usually returns an array of some obscure genres
		// there is no way to consistnetly choose the most 'normal genre', so
		// picking the first listed genre will result in obscure genre labellings
		// (e.g, Post Malone's first listed genre is DFW rap, Drake is candian hip hop. Few artists will have these genres
		// listed, so tallied counts of genres within a cluster may not be helpful )
		const genresResult = await fetch('https://api.spotify.com/v1/artists/?ids=' + artistIdQueryString, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
		})

		const genreData = await genresResult.json()
		console.log(genreData.artists)

		for (let i = 0; i < genreData.artists.length; i++) {
			let artist = genreData.artists[i]
			console.log('genre for ' + artist.name)
			console.log(artist.genres)
		}

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

app.post('/getrecommendations', async (req, res) => {
	const seedString = req.body.seedString
	const token = req.body.token
	// convert string to boolean
	const isStrongFiltered = req.body.isStrongFiltered == 'TRUE' ? true : false
	console.log('filter status ' + isStrongFiltered)

	// get 50 top songs to filter out
	const result = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
	})

	const data = await result.json()
	console.log('Hello this where the tracks at')
	console.log(data.items[0])

	let userTopTrackIdSet = new Set()
	let idToSongName = {}
	let artistSet = new Set()

	if (data.items != null) {
		for (let i = 0; i < data.items.length; i++) {
			var artist = data.items[i].artists[0].name
			// add id to set
			userTopTrackIdSet.add(data.items[i].id)
			artistSet.add(artist)
			idToSongName[data.items[i].id] = data.items[i].name + ' by ' + artist
			// songIdToArtistId[data.items[i].id] = data.items[i].artists[0].id
		}
	}

	//TODO: configure constants to adjust popularity of reccomended songs
	const popularityLimit = !isStrongFiltered ? '80' : '70'

	const recommendResult = await fetch(
		`https://api.spotify.com/v1/recommendations?max_popularity=${popularityLimit}&limit=50&seed_tracks=` + seedString,
		{
			method: 'GET',
			headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
		}
	)

	const recommendData = await recommendResult.json()
	const reccomendedSongUris = []
	const songNames = []
	const TARGET_PLAYLIST_SIZE = 30
	let currentPlaylistSize = 0

	// compose list of song uris to return, filtering songs in process
	// TODO: we could filter top 50 artists out as well if we really want variety --> if we do this make this an option
	console.log(recommendData)
	for (let i = 0; i < recommendData.tracks.length; i++) {
		let trackDict = recommendData.tracks[i]
		let trackId = trackDict.id
		let trackArtistName = trackDict.artists[0].name

		// skip over current song if it is in top 50 or the artist is seen withn top 50 songs
		if (isStrongFiltered && (userTopTrackIdSet.has(trackId) || artistSet.has(trackArtistName))) continue
		// still filter if the rec'd song is in top 50
		else if (!isStrongFiltered && userTopTrackIdSet.has(trackId)) continue

		reccomendedSongUris[i] = trackDict.uri
		currentPlaylistSize++

		// if reach target amount of songs, stop adding
		if (currentPlaylistSize == TARGET_PLAYLIST_SIZE) break

		// let name = trackDict.name;
		// let artist = recommendData.tracks[i].artists[0].name;
		// songNames[i] = name + ' by ' + artist;
	}

	// output array of song uris
	let recommendationResponse = {}

	recommendationResponse['recommendedSongUris'] = reccomendedSongUris

	res.send(JSON.stringify(recommendationResponse))
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
		const thirdId = clusterDistances[i].length >= 3 ? clusterDistances[i][2]['id'] : null
		clustersTopTwoSongIds[i] = thirdId == null ? [firstId, secondId] : [firstId, secondId, thirdId]
		console.log('top closesies')
		console.log(clustersTopTwoSongIds[i])
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
