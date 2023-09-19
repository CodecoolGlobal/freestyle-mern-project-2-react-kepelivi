const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config({
    path: path.join(__dirname, '.env')
});

const app = express();
const PORT = 9000;
const { MONGO_URL } = process.env;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

const usersRouter = require('./routes/user');
app.use('/pokemon/users', usersRouter);

const pokemonsRouter = require('./routes/pokemons');
app.use('/api/pokemons', pokemonsRouter);

async function main() {
    await mongoose.connect(MONGO_URL);
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

main();