require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();

const Recipie = require('./models/Recipie');

const { ingredients, descriptors } = require('./seedHelpers');

mongoose
  .connect(process.env.DB_URI)
  .then((res) =>
    app.listen(process.env.PORT, () => {
      console.log(
        `Mongo connected and server running on port ${process.env.PORT}`
      );
    })
  )
  .catch((err) => console.log(err));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Recipie.deleteMany({});

  for (let i = 0; i < 10; i++) {
    const dish = new Recipie({
      name: `${sample(descriptors)} ${sample(ingredients)}`,
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis dolore est repudiandae neque nulla deserunt error accusantium voluptatibus.',
      ingredients: [
        `${sample(descriptors)}`,
        `${sample(descriptors)}`,
        `${sample(descriptors)}`,
        `${sample(descriptors)}`,
      ],
    });
    await dish.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
