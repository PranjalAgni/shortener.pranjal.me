const mongoose = require("mongoose");

const UrlsSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      unique: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Urls = mongoose.model("Urls", UrlsSchema);

module.exports = Urls;
