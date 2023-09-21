const express = require("express");
const mongoose = require("mongoose");
const User = require("../model/User");
const router = express.Router();

router.post("/user", async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name, password: req.body.password });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/", async (req, res) => {
    try {
        const checkUser = await User.findOne({ name: req.body.userName });
        if (checkUser) {
            return res.status(404).json({ error: 'User name already regsitered.' });
        }
        const name = req.body.userName;
        const password = req.body.userPassword;
        const email = req.body.userEmail;
        const pokemons = [
            "https://pokeapi.co/api/v2/pokemon/bulbasaur",
            "https://pokeapi.co/api/v2/pokemon/charizard",
            "https://pokeapi.co/api/v2/pokemon/poliwhirl"]
        const createdAt = Date.now();
        const user = new User({
            name,
            password,
            email,
            pokemons,
            createdAt
        });
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.json({ success: true, message: 'User deleted successfully.' });
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

module.exports = router;