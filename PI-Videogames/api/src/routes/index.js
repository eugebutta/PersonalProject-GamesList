require("dotenv").config();
const { Router, response } = require("express");
const { Videogame, Genero } = require("../db");
const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

/* router.get("/videogames", function (req, res) {
  Videogame.findAll({ include: Genero })
    .then((games) => {
      res.json(games);
    })
    .catch((error) => {
      next(error);
    });
}); */

router.get("/videogames", function (req, res) {
  var misjuegos = Videogame.findAll({ include: Genero });
  let arr = []
  for (let i = 1; i <= 6; i++) {
    arr.push(axios.get(`https://api.rawg.io/api/games?key=778939d896364e5bb70b7a59959581bb&page=${i}`))
  }
  arr.push(misjuegos)
  
  Promise.all(arr).then((response) => {
   var misjuegos = response.pop()
    var juegosApi = response.map(x => x.data.results)
    var todoslosjuegos = [...misjuegos, ...juegosApi];
    return res.send(todoslosjuegos);
  });
});

router.post("/videogames", async (req, res, next) => {
  const { name, description, released, rating, plataformas, genero } = req.body;
  try {
    const videogame = await Videogame.findOrCreate({
      where: {
        Name: name,
        Descripción: description,
        Rating: rating,
        Released: released,
        Plataform: plataformas,
      },
    });
    console.log(videogame);
    const currentegenero = await Genero.create({ Name: genero });
    console.log(currentegenero);
    await videogame[0].addGenero(currentegenero);
    res.json(videogame);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
