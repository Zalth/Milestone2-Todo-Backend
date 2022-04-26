// Importing Dependecies and Controller that we need

import express from 'express'
import TodosController from './todos_controller'


// Express Router

const router = express.Router();

//Routes for our Todo List , all of them are get execpt for our : id which will have an update and a delete 

router.route('/').get(TodosController.GetTodos);



router.route('/priorities').get(TodosController.GetTodos);

router.route('/duedates').get(TodosController.GetTodos);

router.route('/new').post(TodosController.PostTodo);

router.route('/:id').put(TodosController.UpdateTodo).delete(TodosController.DeleteTodo).get(TodosController.GetTodosId);

export default router;