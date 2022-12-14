const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tweetSchema = new Schema(
  {
    name: { type: String, required: true },
    tweet: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Tweets = mongoose.model("Tweets", tweetSchema);

module.exports = Tweets;
