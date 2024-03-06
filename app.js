// NPM imports 
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const morgan = require('morgan')

// Route imports
const toyRoutes = require('./routes/toy_route')
const landingRoutes = require('./routes/landing')

// Model imports
const Toy = require('./models/toy')

// Enviroment config
dotenv.config('.env');

// set up view engine
app.set("view engine", "ejs");

// Express config
app.use(express.static('public'));

// Body Parser Config
app.use(bodyParser.urlencoded({extended:true}));

//Method Config
app.use(methodOverride('_method'));

// Morgan
app.use(morgan('tiny'))// Used to log info of req HTTP 

// mongodb configuration 
const DB_URL = process.env.ATLAS_URL;
mongoose.connect(DB_URL)
.then(() => {
    console.log("Successfully connect to databse!");
})
.catch((err) => {
    console.error("Failed to connect to database: ",err);
})

// Use Routes
app.use(landingRoutes);
app.use("/toys",toyRoutes);

// call port
app.listen(3000 , () =>{
    console.log("App is running....");
});