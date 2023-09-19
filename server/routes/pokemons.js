const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const PokemonModel = require('../model/Pokemon');

router.get("/", async (req, res) => {
    try {
      const allPokemons = await PokemonModel.find();
      res.json(allPokemons);
    } catch (error) {
      console.log(error);
      res.status(500).send("DB error");
    }
  });

  module.exports = router;