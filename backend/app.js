const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');

const multer = require('multer');
const upload = multer();
const fileupload = require('express-fileupload');
const path = require('path');

const errorMiddleware = require('./middlewares/errors')

//Setting up config file
if(process.env.NODE_ENV !== "PRODUCTION") require('dotenv').dotenv.config({path: 'backend/config/config.env'})

app.use(express.json());
app.use(upload.array());
app.use(express.static('products'));
app.use(cookieParser());
app.use(fileupload());

//Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);

if(process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
        
    })
}

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;