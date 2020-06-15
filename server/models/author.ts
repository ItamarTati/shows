//@ts-ignore
const mongoose = require('mongoose');
//@ts-ignore
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    /**
     * No need to add "id" column
     * It is being created by mLab as "_id"
     */
    name: String,
    age: Number,
    authorid: String
});

module.exports = mongoose.model('Author', authorSchema);