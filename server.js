const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const Schema = mongoose.Schema;

const animeSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
  frontCoverImage: {
    type: String,
    required: true,
  },
  backCoverImage: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
  animeReleaseDate: {
    type: Date,
    required: true,
  },
  numberOfEpisodes: {
    type: Number,
    required: true,
  },
  isDubbed: {
    type: Boolean,
    required: true,
  },
  mangaChapters: {
    type: Number,
    required: true,
  },
  hasEnded: {
    type: Boolean,
    required: true,
  },
});

const animeModel = mongoose.model("show", animeSchema);

const allAnimesSchema = new Schema([animeSchema]);

const allAnimesModel = mongoose.model("shows", allAnimesSchema);

const mongoDBPassword = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://itamar:${mongoDBPassword}@cluster0-qxyeq.mongodb.net/data?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(`Error connecting to database: ${error.message}`);
  });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("app is running");
});

app.get("/shows", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 4;
    const search = req.query.search || "";
    const genres = req.query.genres || "All";
    const sortField = req.query.sort || "title:asc";
    const [field, direction = "asc"] = sortField.split(":");
    const sortObj = {
      [field]: direction === "desc" ? -1 : 1,
    };
    const listOfGenres = await allAnimesModel.distinct("genres");

    let genreFilter = {};
    if (genres !== "All") {
      genreFilter = { genres: { $in: genres.split(",") } };
    }

    let speltCorrectlyTitles = [];
    if (!search) {
      speltCorrectlyTitles.push("");
    } else {
      const animeNames = await allAnimesModel.find();
      speltCorrectlyTitles = findMisspelledTitles(search, animeNames, 4);
      if (speltCorrectlyTitles.length === 0) {
        speltCorrectlyTitles.push(search);
      }
    }

    const animes = await allAnimesModel
      .find({
        title: {
          $in: speltCorrectlyTitles.map((term) => new RegExp(term, "i")),
        },
        ...genreFilter,
      })
      .sort(sortObj)
      .skip(page * limit)
      .limit(limit);

    const numberOfAnimes = await allAnimesModel
      .find({
        title: {
          $in: speltCorrectlyTitles.map((term) => new RegExp(term, "i")),
        },
        ...genreFilter,
      })
      .count();

    const listOfAnimeIds = (await allAnimesModel.find({
      title: {
        $in: speltCorrectlyTitles.map((term) => new RegExp(term, "i")),
      },
      ...genreFilter,
    })
    .select('_id')
    .lean())
    .map(doc => doc._id)


    const numberOfPages = Math.ceil(numberOfAnimes / limit);

    res.json({
      animes: animes,
      numberOfPages: numberOfPages,
      listOfGenres: listOfGenres,
      searchTerm: search,
      listOfAnimeIds: listOfAnimeIds
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/shows/:id", async (req, res) => {
  try {
    const data = await animeModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function findMisspelledTitles(searchTerm, animes, threshold) {
  const misspelledTitles = [];

  for (let i = 0; i < animes.length; i++) {
    const distance = levenshteinDistance(
      searchTerm.toLowerCase(),
      animes[i].title.toLowerCase()
    );
    if (distance <= threshold) {
      misspelledTitles.push(animes[i].title);
    }
  }

  return misspelledTitles;
}

function levenshteinDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () =>
    Array.from({ length: n + 1 }, () => 0)
  );

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }

  return dp[m][n];
}
