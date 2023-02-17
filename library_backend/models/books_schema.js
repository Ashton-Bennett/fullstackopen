const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: String,
  },
  //removed this line that was given by the course. It wasnt working...
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Author",
  // },
  author: {
    type: String,
  },
  genres: [{ type: String }],
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Book", schema);
