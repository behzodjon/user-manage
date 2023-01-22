//importing modules
const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const expressListRoutes = require('express-list-routes');

const cookieParser = require('cookie-parser');
const db = require('./models');
const userRoutes = require('./routes/user');

//setting up your port
const PORT = process.env.PORT || 8080;

//assigning the variable app to express
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
expressListRoutes(app, {
    prefix: '',
    output: function (routes) {
      console.log("wfs",routes);
    }
  });
//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: true }).then(() => {
  console.log('db has been re sync');
});

//routes for the user API
app.use('/api/auth', userRoutes);

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
