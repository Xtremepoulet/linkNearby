require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');

const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync('password', 10);

//middleWare
const verifyToken = require('./middleware/auth');

//express file upload 
const fileUpload = require('express-fileupload');

const app = express();
app.use(cors());
app.use(fileUpload());
//routes jeremy



const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user.js');



//end jeremy routes 

//yanis routes


//end yanis routes

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);


module.exports = app;
