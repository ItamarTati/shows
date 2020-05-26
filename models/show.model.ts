const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ShowSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    image:  {
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
    numberOfMovies: {
        type: Number,
        required: true
    },
    isDubbed: {
        type: Boolean,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Show'
    },

});

module.exports = mongoose.model('Show', ShowSchema);
