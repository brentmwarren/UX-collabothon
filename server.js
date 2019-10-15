// Express is framework we use to make building servers easier and faster
const express = require('express');

// BodyParser assembles our data buffer into an object and makes it available on the request object "body" parameter
const bodyParser = require('body-parser');

// Initialize our server app
const app = express();

// Looking for a server port in node production mode, or use a hard coded port
const PORT = process.env.PORT || 4000;

// Database
const db = require('./models');

// ---------------------------------- TEMP DATA
//ANCHOR put fakedata here

// --------------------------------- MIDDLEWARE
// Serve the Public Directory
// app.use === app.get, app.put, app.delete, app.post
app.use(express.static(`${__dirname}/public`));

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//-------------------------------- ROUTES
// Home Route
// app.get(path, callback function)
//ANCHOR this is essentially the home page 
app.get('/', (req, res) => {
  res.sendFile('views/index.html', {
    root: __dirname,
  });
});

// API ROUTES
// GET Users Index
//ANCHOR this to be the "business page", showing users
app.get('/api/v1/users', (req, res) => {
  db.User.find({}, (error, allUsers) => {
    if (error) return console.log(error);
    res.json({
      status: 200,
      count: allUsers.length,
      data: allUsers,
      dateRequested: new Date().toLocaleString()
    });
  });
  
});