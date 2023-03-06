const { Router } = require("express");
const { getGenre } = require("../Controllers/Genres/loadGenres");
const { Genres } = require("../db");

//--- Se realiza la ruta GET: "/videogames" y por query del name "/videogames?name={game}"

const router = Router();



  
router.get("/", async function(req, res) {
  const genres = await getGenre();
  try {
      
    if (genres) {

      res.status(200).json( genres );
    }
      
  }
     catch (error) {
    return(error)
    }
});
 



module.exports = router;