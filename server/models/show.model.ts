// @ts-ignore
const mongoose = require('mongoose');
// @ts-ignore
const Schema = mongoose.Schema
// @ts-ignore
const ShowSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
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
    genres: {
        type: Array,
        required: true
    },
    frontCoverImage: {
        type: String,
        required: true
    },
    backCoverImage: {
        type: String,
        required: true
    },
    backgroundImage: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true
    },
    animeReleaseDate: {
        type: Date,
        required: true
    },
    numberOfEpisodes: {
        type: Number,
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
    hasEnded: {
        type: Boolean,
        required: true
    },

});

module.exports = mongoose.model('Show', ShowSchema);
