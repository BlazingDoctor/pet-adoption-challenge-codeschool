const express = require("express");
const model = require("./model");
const app = express();
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

app.get("/pets", async (request, response) => {
  // get data from mongoDB
  try {
    let pets = await model.Pets.find();
    response.json(pets);
    console.log(pets);
  } catch {
    response.status(400).send("generic error");
  }
});

app.post("/pets", async function (request, response) {
  const data = request.body;

  try {
    let newPet = new model.Pets({
      name: data.name,
      species: data.species,
      breed: data.breed,
      age: data.age,
      gender: data.gender,
    });
    let error = newPet.validateSync();
    if (error) {
      response.status(400).send(error);
      return;
    }
    await newPet.save();
    response.status(201).json(newPet);
  } catch (error) {
    console.error("Error fetching pets:", error);
    response.status(400).send(error);
  }
});

app.delete("/pets/:id", async (request, response) => {
  try {
    let isDeleted = await model.Pets.findOneAndDelete({
      _id: request.params.id,
    });
    if (isDeleted) {
      console.log("Pet Removed");
      response.status(204).send("Pet Removed");
    } else {
      response.status(404).send("Pet not found :(");
    }
  } catch (error) {
    response.status(400).send(error);
  }
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
