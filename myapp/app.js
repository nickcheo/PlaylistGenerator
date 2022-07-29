const express = require('express');
const app = express();
const path = require('path');
const port = 3000;


app.use('/images', express.static(path.join(__dirname, "../images")))


app.get('/', (req, res) => {
	// res.send('Hello World!')

	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/testroute', (req, res) =>
{
	
	res.sendFile(path.join(__dirname, '../public', 'genre.html'));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
