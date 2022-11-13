const Item = require("../models/itemModel");
const RustItemDescription = require("../models/rust/itemDescriptionModel");
const mongoose = require("mongoose");

// get all items
const getItems = async (req, res) => {
  const items = await Item.find({}).sort({ "prices.first_seen": -1 });
  res.status(200).json({ items: items });
};

// get all rust items
const getRustItems = async (req, res) => {
  const items = await RustItemDescription.find({});
  res.status(200).json({ items: items });
};

// get user inventory
const getUserInventory = async (req, res) => {
  // if user is logged in
  if (req.session.user) {
    const api = await fetch(
      // user inventory by steam id
      `https://steamcommunity.com/inventory/${req.session.user.steamid}/252490/2?l=english&count=5000`
    );

    if (api.ok) {
      const data = await api.json();

      const items = [];

      // make new array only with important informations (name, marketable, tradable)
      data.descriptions.forEach((item) => {
        items.push({
          market_name: item.market_name,
          marketable: item.marketable,
          tradable: item.tradable,
        });
      });

      // add to array information about asset amount
      data.assets.map((asset, index) => {
        if (index < items.length) {
          items[index].amount = asset.amount;
        }
      });

      // filter only marketable and tradable items
      const tmpItems = items.filter(
        (item) => item.marketable === 1 && item.tradable === 1
      );

      const market_names = [];
      
      // get only names of items to find them in DB
      tmpItems.map((item) => {
        market_names.push(item.market_name);
      });

      // find items in DB
      const inventory = await RustItemDescription.find({ name: { $in: market_names } });

      res.status(200).json({ items: inventory });
    }
  } else {
    // doplnit - není přihlášený uživatel
    res.status(200).json({});
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
        data.items.map((item) => {
          Item.create(item);
        })
      ).then(() => res.redirect("http://localhost:3000/"));
    } catch (error) {
      console.log(error);
    }
  }
};

// synchronize all items from rust
const synchronizeRustItems = async (req, res) => {
  // get total items
  const api = await fetch(
    "https://rust.scmm.app/api/item?glow=false&glowsight=false&cutout=false&marketable=true&tradable=true&returning=false&banned=false&specialDrop=false&twitchDrop=false&craftable=false&start=0&count=1&detailed=false"
  );

  if (api.ok) {
    const data = await api.json();
    const total = data.total;

    let items = [];

    // I can get only 100 items per req
    for (let i = 0; i < total; i = i+100) {
      const apiItems = await fetch(
        `https://rust.scmm.app/api/item?glow=false&glowsight=false&cutout=false&marketable=true&tradable=true&returning=false&banned=false&specialDrop=false&twitchDrop=false&craftable=false&start=${i}&count=-1&detailed=false`
      );

      if (apiItems.ok) {
        const dataItems = await apiItems.json();
        // push all items from req to array
        dataItems.items.map((item) => items.push(item));

      } else {
        console.log("error");
      }
      
    }

    try {
      // delete all items in db
      await RustItemDescription.deleteMany();

      // add all items to db
      await Promise.all(
        items.map((item) => {
          if(item.id != 0) {
            RustItemDescription.create(item);
          }
        })
      ).then(() => {
        console.log(`${items.length} have been synchronized`)
        res.redirect("http://localhost:3000/");
      });
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
  synchronizeRustItems,
  getRustItems
};
