const axios = require('axios')
const { Genres } = require('../../db')
const URL = "https://api.rawg.io/api/genres";
const { API_KEY } = process.env;


const getGenre = async () => {
  const get = (await axios.get(URL, {
    params: { key: API_KEY }
  })).data.results
  const genres = get.map(g => {
    return {
      id: g.id,
      name: g.name,
    }
  })


  const info = await genres.map(x => Genres.findOrCreate({ where: x }))
  return genres;

};

module.exports = { getGenre };