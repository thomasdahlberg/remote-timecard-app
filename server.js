const express = require('express');
const port = 3000;
const logger = require('morgan');
const methodOverride = require('method-override');
const indexRouter = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');

//DB Setup
require('./config/database');

//Middleware
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes



//App Listener
app.listen(port, () => {
    console.log(`Express is listening on port: ${port}`);
})
