const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors=require('cors');
const bodyParser = require('body-parser');
dotenv.config();
const authRoutes = require('./router/auth');
const oauthRoutes=require('./router/oauth');
const menuRoutes=require('./router/menuRoute');
require('./config/passport');

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/auth', oauthRoutes);
app.use('/api/menu', menuRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});