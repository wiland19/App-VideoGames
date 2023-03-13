
//-----------Importamos los controllers previamente creados para despues definirlo en nuestras rutas

const { Router } = require("express");
const  {  getInfoTotal } = require("../Controllers/VideoGames/loadInfoGames");
const { getNameInfo } = require("../Controllers/VideoGames/loadInfoNameGame");
const { getIdGame } = require("../Controllers/VideoGames/loadInfoId");

const { Videogame, Genres } = require("../db");

//--- Se realiza la ruta GET: "/videogames" y por query del name "/videogames?name={game}"

const router = Router();




router.get("/", async function (req, res) {
  const { name } = req.query;
  try {
    if (name) {
      const infoGame = await getNameInfo(name);
      res.status(200).json(infoGame);

    } else {
      const gamesAll = await getInfoTotal();
      res.status(200).json(gamesAll);
    }
  } catch (error) {
    res.status(400).json({message:error.message});
    
  }
})

router.get("/:id", async function (req, res) {
  
  const { id } = req.params;

  try {

    const idGame = await getIdGame(id);
    if (idGame) {
      res.status(200).json(idGame);
    } else {
      res.status(400).send("Country not Found By Id")
    }
    
  } catch (error) {
    
    return error;
    
  }

});









module.exports = router;