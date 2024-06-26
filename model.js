const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

const CatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "cat(s) must be named."],
  },
  count: {
    type: Number,
    required: [true, "cat number must be an amount."],
  },
});

const Cats = mongoose.model("Cats", CatSchema);

module.exports = {
  Cats: Cats,
};
