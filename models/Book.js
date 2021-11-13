const { model, Schema } = require("mongoose");

const Book = new Schema({
  version: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  published: {
    type: Number,
    required: true,
  },
  wishlist: {
    type: Boolean,
    default: false,
    required: true,
  },
  hasRead: {
    type: Boolean,
    default: false,
    required: false,
  },
  liked: {
    type: Boolean,
    default: true,
    required: false,
  }
});

module.exports = model('book', Book);