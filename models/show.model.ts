// @ts-ignore
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ShowSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    coverImage:  {
        type: String,
        required: true
    },
    backgroundImage:  {
        type: String,
        required: true
    },
    trailer:  {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    numberOfEpisodes: {
        type: Number,
        required: true
    },
    movieNames: {
        type: Array,
        required: true
    },
    isDubbed: {
        type: Boolean,
        required: true
    },
    mangaChapters: {
        type: Number,
        required: true
    },
    hasEnded:{
        type: Boolean, 
        required: true 
    }, 


});

module.exports = mongoose.model('Show', ShowSchema);
