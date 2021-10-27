require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');

const { updateLoginStatus } = require('./middleware/authMiddleware');

// register view engine
app.set('view engine', 'ejs');

// static files
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
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

// home route
app.get('*', updateLoginStatus);
app.get('/', (req, res) => {
  res.redirect('/recipes');
});

app.use(userRoutes);
app.use(profileRoutes);
app.use(recipeRoutes);

// generic 404 for unused routes
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});
