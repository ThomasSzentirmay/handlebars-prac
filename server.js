require('dotenv').config();
const express = require('express');
// Import handlebars
const { engine } = require('express-handlebars');
// Import express session
const session = require('express-session');
// Import our db connection
const db = require('./db/connection');



// Import routes
const api_routes = require('./controllers/api_routes');
const view_routes = require('./controllers/view_routes');
const user_routes = require('./controllers/user_routes');

const app = express();
const PORT = process.env.PORT || 3333;



// Middleware
app.use(express.json()); // Allows the client/browser to send json in a request (for example if they submit their email and pass)
app.use(express.urlencoded({ extended: true })); // Allows users to submit standard encoded for data like the form we are using with hbs
app.use(express.static('public')); // Allows the client/browser to access any folders or files in public - opens this folder at the root



// Setup Handlebars Template Engine
app.engine('hbs', engine({
  // layout directory that allows you to avoid repeated html code
  layoutsDir: './views/layouts',
  // set extension for your handlebar files to .hbs 
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');



// Load Sessions
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true }
}));



// Load Routes
app.use('/', [api_routes, view_routes, user_routes]);



// Connect to the db and create all tables based off of our models
db.sync({ force: false })
  .then(() => {
    // Start server
    app.listen(PORT, () => console.log('Server started on port %s', PORT));
  });