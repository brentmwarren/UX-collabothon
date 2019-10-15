// Express is framework we use to make building servers easier and faster
const express = require('express');

// BodyParser assembles our data buffer into an object and makes it available on the request object "body" parameter
const bodyParser = require('body-parser');

// Initialize our server app
const app = express();

// Looking for a server port in node production mode, or use a hard coded port
const PORT = process.env.PORT || 4000;

// Database
//ANCHOR need db part?
// const db = require('./models');

// --------------------------------- MIDDLEWARE
// Serve the Public Directory
// app.use === app.get, app.put, app.delete, app.post
app.use(express.static(`${__dirname}/public`));

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//-------------------------------- ROUTES


// ---------------- HTML routes -----------------
// Home Route
// app.get(path, callback function)
//ANCHOR this is essentially the home page 
app.get('/', (req, res) => {
    res.sendFile('views/index.html', {
      root: __dirname,
    });
  });

// GET About Us Route
app.get('/about-us', (req, res) => {
    res.sendFile('views/about.html', {
      root: __dirname,
    });
  });
  
  
  // GET Contacts Index Route
  app.get('/contacts', (req, res) => {
    res.sendFile('/views/contacts.html', {
      root: __dirname,
    });
  });
  
  
  // GET New Contact Route
  app.get('/contacts/new', (req, res) => {
    res.sendFile('/views/new.html', {
      root: __dirname,
    });
  });
  
  
  // GET Contacts Route
  app.get('/contact-us', (req, res) => {
    res.sendFile('/views/contact-us.html', {
      root: __dirname,
    });
  });
  
  
  // GET Contacts Show Route
  app.get('/contacts/:id', (req, res) => {
    res.sendFile('/views/show.html', {
      root: __dirname,
    });
  });
  
  
  // -------------------------- API ROUTES ---------------------- //
  // THESE ROUTES SERVE DATA TO OUR TEMPLATES THROUGH API CALLS (AJAX)
  
  // GET Contacts Index
  app.get('/api/v1/contacts', (req, res) => {
    db.Contact.find({}, (err, allContacts) => {
      if (err) return console.log(err);
  
      res.json({
        status: 200,
        count: allContacts.length,
        data: allContacts,
        dataRequested: new Date().toLocaleString(),
      });
    });
  });
  
  
  // GET Contacts Show
  app.get('/api/v1/contacts/:id', (req, res) => {
    db.Contact.findById(req.params.id, (err, contact) => {
      if (err) return console.log(err);
  
      res.json({
        status: 200,
        count: 1,
        data: contact,
        dataRequested: new Date().toLocaleString(),
      });
    });
  });
  
  
  // POST Contacts Create
  app.post('/api/v1/contacts', (req, res) => {
    // console.log(req.body);
    // res.sendStatus(201);
    db.Contact.create(req.body, (err, newContact) => {
      if (err) return console.log(err);
  
      res.json({
        status: 201,
        count: 1,
        data: newContact,
        dataRequested: new Date().toLocaleString(),
      });
    });
  });
  
  
  // -------------------------- START SERVER ---------------------- //
  app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));