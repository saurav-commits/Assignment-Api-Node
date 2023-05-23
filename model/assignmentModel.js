const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }, 
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
      },
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
      },
    score: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Assignment', assignmentSchema);