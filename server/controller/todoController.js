const {todoModel} = require('../model/TodoModel');
const {check, validationResult} = require('express-validator');

const fieldChecker = [
    check('title').isLength({min: 1}).withMessage("Please Enter a Title"),
    check('des').isLength({min: 1}).withMessage("Please Enter a Description"),
];

const resultValidator = (req,res,next) => {
    const error = validationResult(req);
    const mappedErrors = error.mapped();
    if(Object.keys(mappedErrors).length > 0){
        res.status(400).json(mappedErrors);
    }else{
        next();
    }
}

const postTodo = async (req,res,next) => {
    try{
        const {title, des} = req.body;
        await todoModel.create({
            title: title,
            des: des,
        });
        res.status(201).json({
            msg: 'Todo Added',
        })
    }catch(error){
        next(new Error('Database Error'));
    }
    
}

const getTodos = async (req,res,next) => {
    try{
        const response = await todoModel.find({});
        res.status(200).json(response);
    }catch(error){
        next(new Error(error.message));
        console.log(error);
    }
}


module.exports = {
    postTodo,
    fieldChecker,
    resultValidator,
    getTodos,
}