const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        maxLength: 25, 
        trim: true 
    },

    teacher: {
        type: String,
        required: true,
        maxLength: 25, 
        trim: true 
    }
});

module.exports = mongoose.model('Course', courseSchema);
