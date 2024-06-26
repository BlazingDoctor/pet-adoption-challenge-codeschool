const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Have Name"],
  },
  species: {
    type: String,
    required: [true, "Must Have Species"],
  },
  breed: {
    type: String,
    required: [true, "Must Have Breed"],
  },
  age: {
    type: Number,
    required: [true, "Must Have Age"],
  },
  gender: {
    type: String,
    required: [true, "Must Have Gender"],
  },
});
const ApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Have Name."],
  },
  phoneNumber: {
    type: String,
    required: [true, "Must Have Phone number"],
  },
  email: {
    type: String,
    required: [true, "Must Have Email"],
  },
  petId: {
    type: String,
    required: [true, "Must Have ID"],
  },
});

const Pets = mongoose.model("Pets", PetSchema);
const Application = mongoose.model("Application", ApplicationSchema);

module.exports = {
  Pets: Pets,
  Application: Application,
};
