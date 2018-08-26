const router = require('express').Router();
const Todo = require('../models/todo');

router.get('/', function (req, res) {
  Todo.find({}).then(function (result) {
    var todos = result.filter(function (todo) {
      return !todo.completed;
    });

    var doneTodos = result.filter(function (todo) {
      return todo.completed;
    });

    res.render('index', {todos: todos, doneTodos: doneTodos});
  })
})

router.post('/todos', function (req, res) {
  var newTodo = new Todo({ descreption: req.body.descreption });
  newTodo.save().then(function (result) {
    res.redirect('/');
  }).catch(function (err) {
    console.log(err);
    res.redirect('/');
  })
})

router.post('/todos/:id/completed', function (req, res) {
  var todoId = req.params.id;
  Todo.findById(todoId).exec().then(function (results) {
    results.completed = !results.completed;
    return results.save();
  }).then(function (results) {
      res.redirect('/');
  })
})

router.post('/todos/:id/delete', function (req, res) {
  var todoIds = req.params.id;
  Todo.findById(todoIds).remove().exec().then(function (del) {
      res.redirect('/');
  })
})

module.exports = router;
