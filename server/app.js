
const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3000;

// Configure Handlebars
app.engine('handlebars', engine({
  defaultLayout: false,
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

// Middleware
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve compiled frontend files
app.use(express.static(path.join(__dirname, '../hosted')));

// Main application page
app.get('/', (req, res) => {
  res.render('index');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(port, () => {
  console.log(`QuestLog server running on port ${port}`);
});
