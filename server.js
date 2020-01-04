const express = require('express');
const port = 3000;
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const indexRouter = require('./routes/index');

//Env
require('dotenv').config();

//Express App
const app = express();

//View Engine Setup
app.set('view engine', 'ejs');

//DB Setup
require('./config/database');
require('./config/passport');

//Middleware
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret:'RemoteTimecard!',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', indexRouter);


//App Listener
app.listen(port, () => {
    console.log(`Express is listening on port: ${port}`);
})
