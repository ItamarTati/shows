const Show = require('../models/show.model.ts');



exports.findAll = (req, res) => {
    Show.find()
    .then(shows => {
        res.send(shows);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving shows."
        });
    });
};


exports.create = (req, res) => {
    if(!req.body) {
      return res.status(400).send({
      message: "Please fill all required field"
    });
    }
    const show = new Show({
        title: req.body.title,
        familyName: req.body.familyName,
        author: req.body.author,
        description: req.body.description,
        genre: req.body.genre,
        coverImage: req.body.coverImage,
        backgroundImage: req.body.backgroundImage,
        trailer: req.body.trailer,
        releaseDate: req.body.releaseDate,
        numberOfEpisodes: req.body.numberOfEpisodes,
        movieNames: req.body.movieNames,
        isDubbed: req.body.isDubbed,
        mangaChapters: req.body.mangaChapters,
        hasEnded: req.body.hasEnded,

    });
    show.save()
      .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
      message: err.message || "Something went wrong while creating new show."
    });
    });
    };
    exports.findOne = (req, res) => {
     Show.findById(req.params.id)
      .then(show => {
      if(!show) {
       return res.status(404).send({
       message: "show not found with id " + req.params.id
     });
    }
     res.send(show);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
        message: "show not found with id " + req.params.id
      });
    }
    return res.status(500).send({
      message: "Error getting show with id " + req.params.id
    });
    });
    };
    exports.update = (req, res) => {
    if(!req.body) {
      return res.status(400).send({
      message: "Please fill all required field"
    });
    }
    Show.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        familyName: req.body.familyName,
        author: req.body.author,
        description: req.body.description,
        genre: req.body.genre,
        coverImage: req.body.coverImage,
        backgroundImage: req.body.backgroundImage,
        trailer: req.body.trailer,
        releaseDate: req.body.releaseDate,
        numberOfEpisodes: req.body.numberOfEpisodes,
        movieNames: req.body.movieNames,
        isDubbed: req.body.isDubbed,
        mangaChapters: req.body.mangaChapters,
        hasEnded: req.body.hasEnded,
    }, {new: true})
    .then(show => {
     if(!show) {
       return res.status(404).send({
       message: "show not found with id " + req.params.id
     });
    }
    res.send(show);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
      message: "show not found with id " + req.params.id
    });
    }
    return res.status(500).send({
      message: "Error updating show with id " + req.params.id
    });
    });
    };
    exports.delete = (req, res) => {
    Show.findByIdAndRemove(req.params.id)
    .then(show => {
    if(!show) {
      return res.status(404).send({
      message: "show not found with id " + req.params.id
    });
    }
    res.send({message: "show deleted successfully!"});
    }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
      message: "show not found with id " + req.params.id
    });
    }
    return res.status(500).send({
      message: "Could not delete show with id " + req.params.id
    });
    });
    };