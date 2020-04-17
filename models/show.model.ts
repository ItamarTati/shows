const mongoose = require('mongoose');

const ShowSchema = mongoose.Schema({
    title: String,
    description: String,
    genre: String,
    image:  Buffer,
    releaseDate: Date,
    numberOfEpisodes: Number,
    isDubbed: Boolean

});

module.exports = mongoose.model('Show', ShowSchema);