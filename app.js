const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const playlist = require('./playstore.js')

app.get('/apps', (req, res) => {
  const {sort, genres} = req.query
  const genreOptions = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
  genreOptionsLowerCase = genreOptions.forEach(e => {
    e.toLowerCase
  })
  let filterPlaylist = [...playlist]
  
  if (sort.toLowerCase() !== 'rating' || sort.toLowerCase() !== 'app') {
    return res.status(400).send(`Sort param must be 'rating' or 'app'`)
  }

  
  
  if (!genreOptionsLowerCase.includes(genres.toLowerCase())) {
    return res.status(400).send(`Genre must be one of the following: 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card' `)
  }
  

res
  .json(filterPlaylist)
  
})


app.listen(8000, () => {
  console.log('Server started on PORT 8000')
});