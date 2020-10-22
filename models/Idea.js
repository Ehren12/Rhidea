
const mongoose = require('mongoose')
const User = require('./User')

const IdeaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },

    problem: {
        type: String,
        required: false 
    },

    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private'],
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    createdAt: {
        type: Date,
        created: Date
    },

    tags: {
        type: String,
        trim: true,
        lowercase: true,
    },

    bulbs: {
        type: Number,
    },
})

module.exports = mongoose.model('Idea', IdeaSchema)