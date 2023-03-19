const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const Schema = mongoose.Schema

const animeSchema = new Schema({
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


const animeModel = mongoose.model('show', animeSchema)

const allAnimesSchema = new Schema(
    [animeSchema]
);

const allAnimesModel = mongoose.model('shows', allAnimesSchema);


const mongoDBPassword = process.env.MONGODB_PASSWORD
mongoDBPort = process.env.MONGO_DB_PORT
const uri = process.env.mongodb || `mongodb+srv://itamar:${mongoDBPassword}@cluster0-qxyeq.mongodb.net/data?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to database');
        app.listen(mongoDBPort, () => console.log(`Server running on port ${mongoDBPort}`));
    })
    .catch((error) => {
        console.log(`Error connecting to database: ${error.message}`);
    });

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('app is running');
});

app.get('/shows', async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || ["title", "numberOfEpisodes", 
        "mangaChapters", "animeReleaseDate"];
        const genre = req.query.genre || "All";
      
        const sortObj = {};
        sort.forEach((sortField) => {
          const [field, direction = "asc"] = sortField.split(":");
          sortObj[field] = direction === "desc" ? -1 : 1;
        });
      
        const genres = await allAnimesModel.distinct("genres");
        const genreFilter = genre === "All" ? {} : { genres: { $in: genres } };
      

        const animes = await allAnimesModel
        .find({title: { $regex: search, $options: "i" }, ...genreFilter })          
        .sort(sortObj)
        .skip(page * limit)
        .limit(limit);
      
        res.json(animes);
      }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/shows/:id', async (req, res) => {
    try {
        const data = await animeModel.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})






