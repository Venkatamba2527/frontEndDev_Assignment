const express = require('express');
const authenticateToken = require('../middleware/jwtAuth');
const { taskValidation } = require('../validations/taskValidations');
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const router = express.Router();

router.get('/', authenticateToken, getAllTasks);
router.get('/:id', authenticateToken, getTask);
router.post('/', authenticateToken, taskValidation, createTask);
router.put('/:id', authenticateToken, taskValidation, updateTask);
router.delete('/:id', authenticateToken, deleteTask);

module.exports = router;
