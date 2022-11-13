const express = require("express");
const Item = require("../models/itemModel");

const {
    getItems,
    addItems,
    getItemsByRegex,
    getUserInventory,
    synchronizeRustItems,
    getRustItems
} = require("../controllers/itemController")

const router = express.Router();

// GET all items
router.get("/get", getRustItems);

// UPDATE all items
router.get("/update", synchronizeRustItems);

// GET user inventory
router.get("/inventory", getUserInventory);

// GET all items
router.get("/:regex", getItemsByRegex);





module.exports = router;