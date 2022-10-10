const Item = require("../models/itemModel");
const mongoose = require('mongoose');

// get all items
const getItems = async (req, res) => {
    const items = await Item.find({}).sort({"prices.first_seen": -1});
    //const items = await Item.find({ "market_name": { "$regex": "blackout", "$options": "i" } }).sort({ "prices.first_seen": -1 });

    if (req.session.user) {
        res.status(200).json({
            items: items,
            username: req.session.user.personaname,
            avatar: req.session.user.avatar
        });
    } else {
        res.status(200).json({ items: items });
    }


};

// get all items
const getItemsByRegex = async (req, res) => {
    const { regex } = req.params
    const items = await Item.find({ "market_name": { "$regex": regex, "$options": "i" } }).sort({ "prices.first_seen": -1 });
    res.status(200).json({ items: items });
};



// add new list of items
const addItems = async (req, res) => {
    const api = await fetch('https://api.steamapis.com/market/items/252490?api_key=ktoOMdRdDGN5q0xe0xPg0-hAsKI');

    if (api.ok) {
        const data = await api.json();

        try {
            await Item.deleteMany();

            await Promise.all(data.data.map((item) => {
                Item.create(item);
            })).then(() => res.redirect("http://localhost:3000/"));

        } catch (error) {
            console.log(error);
        }
    }
}





module.exports = {
    getItems,
    addItems,
    getItemsByRegex
}