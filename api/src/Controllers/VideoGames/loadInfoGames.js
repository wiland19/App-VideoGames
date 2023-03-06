const axios = require("axios");
const { Videogame, Genres } = require("../../db");
const URL = "https://api.rawg.io/api/games";
const { API_KEY } = process.env;



//---------------- Primero traemos la info de la Api----------------
//------------------------------------------------------------------

const getApiInfo = async () => {

  //hacemos el llamado de los 100 juegos en donde se hara 20 por acda llamado y el array vacio para irlos agregando
  const apiInfo = 5;
  const gamesTotal = [];

  for (let i = 1; i <= apiInfo; i++) {
    const { data } = await axios.get(URL, {
      params: { key: API_KEY, page: i },
    });

    data.results.map((game) => {
      gamesTotal.push({
        id: game.id,
        name: game.name,
         description: game.description_raw,
        released: game.released,
        image: game.background_image,
        rating: game.rating,
        platforms: game.platforms.map((e) => e.platform.name),
        genres: game.genres.map((e) => e.name),
      });
    });
  }

  return gamesTotal;
};


//--------------------Traemos la info de la dB-------------------
//---------------------------------------------------------------
const getDbInfo = async () => {
  const dbInfo = await Videogame.findAll({
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dbInfo;
};




//------------------Sumo la info de la api + la info de la db----
//---------------------------------------------------------------

const getInfoTotal = async () => {
  
  const infoApi = await getApiInfo();
  let infoDb = await getDbInfo();

 

  

  const infoTotal = infoDb.concat(infoApi);

  return infoTotal

};

module.exports = { getApiInfo, getDbInfo, getInfoTotal };