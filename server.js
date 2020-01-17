const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const cors = require('cors');
const port = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sessionsRouter = require('./routes/sessions');
const jobsitesRouter = require('./routes/jobsites');
const apisRouter = require('./routes/api');

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
// app.use('/', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/jobsites', jobsitesRouter);
app.use('/api', apisRouter);
app.use(cors());


//App Listener
app.listen(port, () => {
    console.log(`Express is listening on port: ${port}`);
})
