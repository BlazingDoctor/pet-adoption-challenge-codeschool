const express = require("express");
const model = require("./model");
const app = express();
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

app.get("/cats", async (request, response) => {
  // get data from mongoDB
  try {
    let cats = await model.Cats.find();
    response.json(cats);
    console.log(cats);
  } catch {
    response.status(400).send("generic error");
  }
});

app.post("/cats", async function (request, response) {
  const data = request.body;

  try {
    let newCat = new model.Cats({
      name: data.name,
      count: data.count,
    });
    let error = newCat.validateSync();
    if (error) {
      response.status(400).send(error);
      return;
    }
    await newCat.save();
    response.status(201).json(newCat);
  } catch (error) {
    console.error("Error fetching cats:", error);
    response.status(400).send(error);
  }
});

app.delete("/cats/:id", async (request, response) => {
  try {
    let isDeleted = await model.Cats.findOneAndDelete({
      _id: request.params.id,
    });
    if (isDeleted) {
      console.log("Cat Removed");
      response.status(204).send("Cat Removed");
    } else {
      response.status(404).send("Cat not found :(");
    }
  } catch (error) {
    response.status(400).send(error);
  }
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
