const express = require('express');
const { engine } = require('express-handlebars');
// Import our db connection
const db = require('./db/connection');

// Import routes
const api_routes = require('./controllers/api_routes');
const view_routes = require('./controllers/view_routes');

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(express.json()); // Allows the client/browser to send json in a request
app.use(express.static('public')); // Allows the client/browser to access any folders or files in public - opens this folder at the root

// Setup Handlebars Template Engine
app.engine('handlebars', engine({
  // layout directory that allows you to avoid repeated html code
  layoutsDir: './views/layouts',
  extname: 'hbs'
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Load Routes
app.use('/', [api_routes, view_routes]);

// Connect to the db and create all tables based off of our models
db.sync({ force: false })
  .then(() => {
    // Start server
    app.listen(PORT, () => console.log('Server started on port %s', PORT));
  });
