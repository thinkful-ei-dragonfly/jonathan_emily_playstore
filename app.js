const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const playlist = require('./playstore.js')
let filterPlaylist = [...playlist];

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query
  const sortOptions = ['rating', 'app']
  const genreOptions = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
  const genreOptionsLowerCase = genreOptions.map(e => 
    e.toLowerCase()
  )
//Default case
if(!genres && !sort){
  return res.json(filterPlaylist)
}
  else if (!sortOptions.includes(sort.toLowerCase())) {
    return res.status(400).send(`Sort param must be 'rating' or 'app'`)
  }

  else if (!genreOptionsLowerCase.includes(genres.toLowerCase())) {
    return res.status(400).send(`Genre must be one of the following: 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card' `)
  }

  else if (genres) {
    filterPlaylist = filterPlaylist.filter(app => app
      .Genres
      .toLowerCase()
      .includes(genres.toLowerCase()))
  }

  else if (sort) {
    filterPlaylist
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      })
  }

  res
    .json(filterPlaylist);


})


app.listen(8000, () => {
  console.log('Server started on PORT 8000')
});