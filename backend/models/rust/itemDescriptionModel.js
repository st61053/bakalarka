const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rustItemDescriptionSchema = new Schema(
    {
        originalPrice: Number,
        buyNowFrom: String,
        buyNowPrice: Number,
        buyNowUrl: String,
        subscriptions: Number,
        supplyTotalEstimated: Number,
        actions: [
          {
            icon: String,
            name: String,
            url: String
          },
          {
            icon: String,
            name: String,
            url: String
          }
        ],
        id: Number,
        appId: Number,
        name: String,
        itemType: String,
        hasGlow: false,
        backgroundColour: String,
        foregroundColour: String,
        iconAccentColour: String,
        iconUrl: String,
        timeCreated: String,
        timeAccepted: String
    }
);

module.exports = mongoose.model('RustItemDescription',rustItemDescriptionSchema);