const axios = require("axios");
const { Videogame, Genres } = require("../../db");
const URL = "https://api.rawg.io/api/games";
const { API_KEY } = process.env;
const { Op } = require('sequelize');
const { getDbInfo } = require("./loadInfoGames");



//---------------- Buscamos el Name del Games en la info de la Api----------------
//------------------------------------------------------------------

const getNameInfo = async (name) => {
  const searchName = (await axios.get(URL, {
    params: { key: API_KEY, search: name },
  })).data;

  const result = searchName.results.slice(0, 15).map(game=>{
        return {
            id: game.id,
          name: game.name,
            released:game.released,
            image: game.background_image,
          rating: game.rating,
          platforms:game.platforms.map((e)=> e.platform.name),
          genres: game.genres.map((e) => e.name),
        }
    })

  
  // //---------------- Buscamos el Name del Games en la Db----------------
// //------------------------------------------------------------------
    const searchDb = await Videogame.findAll({
        where: {
            name: {
                [Op.like]: `${name}%`
            }
        }
    })
  
  // //------------------Sumo la info de la api + la info de la db----
// //---------------------------------------------------------------
    return result.concat(searchDb)

}

module.exports = {  getNameInfo };