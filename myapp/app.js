const express = require('express');
const app = express();
const path = requre('path');
const port = 3000;

app.use(express.static('../templates'));

app.get('/', (req, res) => {
	// res.send('Hello World!')

	res.sendFile(path.join(__dirname, '../public', 'genre.html'));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
