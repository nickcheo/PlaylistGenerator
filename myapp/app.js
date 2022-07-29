const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const client_id="a1c0d6debc2c49038fb8a43eb5df637a"
const client_secret="76669d3b28f94e8da7662d91cc39cc94"

app.use('/images', express.static(path.join(__dirname, "../images")))


app.get('/', (req, res) => {
	// res.send('Hello World!')

	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/testroute', (req, res) =>
{
	
	res.sendFile(path.join(__dirname, '../public', 'genre.html'));
});

app.get('/login', function(req,res){

	var state = generateRandomString(16);
  	var scope = 'user-read-private user-read-email user-library-read user-top-read';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: 'http://localhost:3000',
      state: state
    }));

});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
