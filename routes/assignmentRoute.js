const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

router.post('/', assignmentController.createAssignment);
router.get('/', assignmentController.getAllAssignments);
router.get('/:id', assignmentController.getAssignment);
router.delete('/:id', assignmentController.deleteAssignment);
router.put('/:id', assignmentController.updateAssignmentById);


module.exports = router;
