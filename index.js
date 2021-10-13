require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const recipieRoutes = require('./routes/recipieRoutes');
const userRoutes = require('./routes/userRoutes');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// mongodb connection
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

// once connected to mongoose start listening on server
mongoose
  .connect(DB_URI)
  .then((res) =>
    app.listen(PORT, () => {
      console.log(`Mongo connected and server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

app.use(userRoutes);
app.use(recipieRoutes);

// home route
app.get('/', (req, res) => {
  res.send('Homepage');
});

// generic 404 for unused routes
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});
