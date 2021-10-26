require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();

const Recipe = require('./models/Recipe');

const { ingredients, descriptors, cats } = require('./seedHelpers');

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
  await Recipe.deleteMany({});

  for (let i = 0; i < 20; i++) {
    const randNum = Math.floor(Math.random() * 20);
    const dish = new Recipe({
      name: `${sample(descriptors)} ${sample(ingredients)}`,
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis dolore est repudiandae neque nulla deserunt error accusantium voluptatibus.',
      ingredients: [
        `${sample(descriptors)}`,
        `${sample(descriptors)}`,
        `${sample(descriptors)}`,
        `${sample(descriptors)}`,
      ],
      categories: [`${sample(cats)}`],
      likes: randNum,
      user:
        randNum > 10 ? '6168715951114b2160db286d' : '6168791c27958a5fc0ef7deb',
      image: {
        filename: 'file',
        url: 'https://source.unsplash.com/collection/2533969/',
      },
    });
    await dish.save();
  }

  console.log('DB seeded');
};

seedDB().then(() => {
  mongoose.connection.close();
});
