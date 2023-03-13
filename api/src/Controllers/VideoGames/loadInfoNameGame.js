const axios = require("axios");
const { Videogame, Genres } = require("../../db");
const URL = "https://api.rawg.io/api/games";
const { API_KEY } = process.env;
const { Op } = require('sequelize');
const { getDbInfo } = require("./loadInfoGames");



//---------------- Buscamos el Name del Games en la info de la Api----------------
//------------------------------------------------------------------

const getInfoName = async (name) => {
  const searchName = await axios.get(URL, {
    params: { key: API_KEY, search: name },
  });

  const response = searchName.data.results;

  const result = response.slice(0, 15).map(game => {
    return {
      id: game.id,
      name: game.name,
      released: game.released,
      image: game.background_image,
      rating: game.rating,
      platforms: game.platforms.map((e) => e.platform.name),
      genres: game.genres.map((e) => e.name),
    }
  })
  return result;

}

  
// //---------------- Buscamos el Name del Games en la Db----------------
// //------------------------------------------------------------------
    

const getInfoDb = async (name) => {

  const info = await getDbInfo();
  const infoName = await info.filter((x) => x.name.toLowerCase().includes(name.toLowerCase));

  return infoName;
}

// //---------------- Game Name  en la Db + APi----------------
// //------------------------------------------------------------------

const getNameInfo = async (name) => {
  
  const apiName = await getInfoName(name);
  const dBName = await getInfoDb(name);
  const infoTotal = dBName.concat(apiName);

  return infoTotal;

}

module.exports = { getNameInfo };