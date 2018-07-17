const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const epilogue = require('epilogue');

let app = express();
app.use(cors());
app.use(bodyParser.json());

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './catalogue.sqlite'
});

const Movie = database.define(
  'movies', 
  {
    title: Sequelize.STRING,
    year: Sequelize.INTEGER(4),
    genre: Sequelize.STRING,
    cast: Sequelize.STRING,
  }
);

epilogue.initialize({
  app: app,
  sequelize: database
})

const userResource = epilogue.resource({
  model: Movie,
  endpoints: [
    '/movies', 
    '/movies/:id'
  ],
});

database
  .sync({ 
    // force: true
  })
  .then(() => {
    app.listen(8081, () => {
      console.log('Listening to port localhost:8081')
    })
  });