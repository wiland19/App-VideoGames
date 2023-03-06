const { Router } = require('express');
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getVideoGames = require("./GamesRoute.js");
const getGenres = require("./GenresRoute");
const addGames = require("./addGamesRoute");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/games', getVideoGames);
router.use('/games', addGames);
router.use("/genres", getGenres);



module.exports = router;
