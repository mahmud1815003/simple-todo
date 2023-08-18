const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { todoRouter } = require('./router/todoRouter');


//Environment Setup
dotenv.config();

//express
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('short'));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));

//Routes
app.use('/todo', todoRouter);

//Not Found
app.use((req, res, next) => {
    res.status(404).json({status: 404, msg: 'Routes Not Found'});
})

//Error Handler
app.use((error, req, res, next) => {
    if(error.status){
        res.json(error.message);
    }else{
        res.status(500).json(error.message);
    }
})

//Sever and database
const port = process.env.port || 3000;
mongoose.connect(`mongodb+srv://${process.env.mongo}.ifgfb0z.mongodb.net/todolist?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database Connected');
    app.listen(port, () => {
        console.log(`Listening on Port ${port}`);
    });
}).catch(error => {
    console.log('Database Connection Failed');
    console.log(error);
})

