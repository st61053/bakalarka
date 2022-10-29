const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemDetailSchema = new Schema(
    {
        nameID: String,
        market_name: String,
        market_hash_name: String,
        border_color: String,
        image: String,
        prices: {
            latest: Number,
            min: Number,
            avg: Number,
            max: Number,
            mean: Number,
            median: Number,
            safe: Number,
            safe_ts: {
                last_24h: Number,
                last_7d: Number,
                last_30d: Number,
                last_90d: Number
            },
            sold: {
                last_24h: Number,
                last_7d: Number,
                last_30d: Number,
                last_90d: Number,
                avg_daily_volume: Number
            },
            unstable: Boolean,
            unstable_reason: String,
            first_seen: Number
        },
        updated_at: Number
    }
);

module.exports = mongoose.model('ItemDetail',itemDetailSchema);