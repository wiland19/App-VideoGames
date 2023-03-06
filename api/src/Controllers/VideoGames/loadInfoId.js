
const axios = require("axios");
const { Videogame, Genres } = require("../../db");
const { API_KEY } = process.env;



// //-----------defino la funcion que me trae el Id----------------
// //--------------------------------------------------------------

const getApiIdGame = async (id) => {

  const { data } = await axios.get(`https://api.rawg.io/api/games/${id}`, {
      params: { key: API_KEY},
    });

  const platforms = data.platforms.map((e) => e.platform.name);
  const genres = data.genres.map((genre) => genre.name);

  let Game = {
      
      image: data.background_image,
      id:data.id,
      name: data.name,
      genres: genres,
      description: data.description_raw,
      released: data.released,
      rating: data.rating,
      platforms: platforms.join(", "),
    };

    return Game;
}

const getDbIdGame = async (id) => {
  const dBInfo = await Videogame.findOne({
    where: {
      id: id,
    },
    include: {
      model: Genres,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });
  dBInfo.genres = dBInfo.genres.map((x) => x.name);
  
  let Game = {
      
        id: dBInfo.id,
        name: dBInfo.name,
        image: dBInfo.image,
        description: dBInfo.description,
        platforms: dBInfo.platforms ,
        released: dBInfo.released,
        rating: dBInfo.rating,
        genres: dBInfo.genres
    };

    return Game;

};

const getIdGame = async function (id) {

    try {
        if(id.length < 7){
            return getApiIdGame(id)
        }
        return getDbIdGame(id);
    } catch (error) {
        throw new Error
    }

}







module.exports = { getIdGame};