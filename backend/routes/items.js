const express = require("express");
const Item = require("../models/itemModel");

const {
    getItems,
    addItems,
    getItemsByRegex
} = require("../controllers/itemController")

const router = express.Router();

// GET all items
router.get("/", getItems);

// GET all items
router.get("/:regex", getItemsByRegex);

// UPDATE all items
router.get("/update", addItems);




module.exports = router;