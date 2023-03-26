const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: String,
    description: String,
    completed: Boolean,
    imageUrl: String
});

module.exports = mongoose.model('taskSchema', taskSchema);