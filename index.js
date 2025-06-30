const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Flash and Session
app.use(session({
    secret: 'yourSecretKey', // replace with a secure secret
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});




app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// Routes
const noteRoutes = require('./routes/notes');
app.use('/notes', noteRoutes);

// Root Redirect
app.get('/', (req, res) => {
    res.redirect('/notes');
});


app.get('/test-flash', (req, res) => {
  req.flash('success', '✅ Flash test successful!');
  res.redirect('/notes');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
