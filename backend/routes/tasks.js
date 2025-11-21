

const router = require('express').Router();
const {protect} = require('../middleware/auth');
const {getTasks,createTask,getTask,updateTask,deleteTask} = require('../controllers/taskController');

router.get('/tasks', protect, getTasks);
router.post('/tasks', protect, createTask);
router.get('/tasks/:id', protect, getTask);
router.put('/tasks/:id', protect, updateTask);
router.delete('/tasks/:id', protect, deleteTask);


module.exports = router;
