const express = require('express')
const app = express()
const port = 3000


app.use(express.static('../templates'))

app.get('/', (req, res) => {
  // res.send('Hello World!')

  res.sendFile('genre.html')
    

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})