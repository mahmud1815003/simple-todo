const express = require('express');
const { fieldChecker, resultValidator, postTodo, getTodos } = require('../controller/todoController');
const todoRouter = express.Router();


todoRouter.get('/all', getTodos);

todoRouter.post('/', fieldChecker, resultValidator, postTodo);

module.exports = {
    todoRouter,
}