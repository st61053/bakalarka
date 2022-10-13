const express = require("express");
const Item = require("../models/itemModel");

const {
    getItems,
    addItems,
    getItemsByRegex,
    getUserInventory
} = require("../controllers/itemController")

const router = express.Router();

// GET all items
router.get("/get", getItems);

// UPDATE all items
router.get("/update", addItems);

// GET user inventory
router.get("/inventory", getUserInventory);

// GET all items
router.get("/:regex", getItemsByRegex);





module.exports = router;