const { body } = require('express-validator');

exports.taskValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('status').optional().isIn(['todo', 'in-progress', 'done']).withMessage('Invalid status')
];
