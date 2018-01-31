const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const powerbiAurthRoutes = require('./server/routes/powerbi-aurth');
const powerbiCollectionRoutes = require('./server/routes/powerbi-collection');
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Fix CORS issue Chrome & FF
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/static', express.static(__dirname + '/bower_components'));
// Set our api routes
app.use('/api/aurth', powerbiAurthRoutes);
app.use('/api/collection', powerbiCollectionRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res, next) => {
  // res.sendFile(path.join(__dirname, 'dist/index.html'));
  next();
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));