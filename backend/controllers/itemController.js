const Item = require("../models/itemModel");
const mongoose = require("mongoose");

// get all items
const getItems = async (req, res) => {
  const items = await Item.find({}).sort({ "prices.first_seen": -1 });
  //const items = await Item.find({ "market_name": { "$regex": "blackout", "$options": "i" } }).sort({ "prices.first_seen": -1 });

  res.status(200).json({ items: items });
};

// get user inventory
const getUserInventory = async (req, res) => {
  const api = await fetch(
    "https://steamcommunity.com/inventory/76561198074923638/252490/2?l=english&count=5000"
  );

  if (api.ok) {
    const data = await api.json();

    const items = [];

    data.descriptions.forEach((item) => {
      items.push({
        market_name: item.market_name,
        marketable: item.marketable,
        tradable: item.tradable,
      });
    });

    data.assets.map((asset, index) => {
      if (index < items.length) {
        items[index].amount = asset.amount;
      }
    });

    const tmpItems = items.filter(
      (item) => item.marketable === 1 && item.tradable === 1
    );

    const market_names = [];

    tmpItems.map((item) => {
      market_names.push(item.market_name);
    });

    const inventory = await Item.find({ market_name: { $in: market_names } });

    res.status(200).json({ items: inventory});
  }
};

// get all items
const getItemsByRegex = async (req, res) => {
  const { regex } = req.params;
  const items = await Item.find({
    market_name: { $regex: regex, $options: "i" },
  }).sort({ "prices.first_seen": -1 });
  res.status(200).json({ items: items });
};

// add new list of items
const addItems = async (req, res) => {
  const api = await fetch(
    "https://api.steamapis.com/market/items/252490?api_key=ktoOMdRdDGN5q0xe0xPg0-hAsKI"
  );

  if (api.ok) {
    const data = await api.json();

    try {
      await Item.deleteMany();

      await Promise.all(
        data.data.map((item) => {
          Item.create(item);
        })
      ).then(() => res.redirect("http://localhost:3000/"));
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  getItems,
  addItems,
  getItemsByRegex,
  getUserInventory,
};
