const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

dotenv.config();
const app = express();

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB Error:", err));

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../frontend/public')));

// ✅ Session must be set before flash
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false
}));

// ✅ Flash middleware
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash(); // ✅ this makes messages available in EJS
  res.locals.user = req.session.user;
  next();
});


// ✅ EJS & Layouts setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));
app.use(expressLayouts);
app.set('layout', 'layout');  // layout.ejs in views root

// ✅ Routes
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));

// ✅ Default redirect
app.get('/', (req, res) => res.redirect('/notes'));

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
