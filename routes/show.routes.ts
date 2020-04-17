module.exports = (app) => {
    const shows = require('../controllers/show.controller.ts');


    app.get('/shows', shows.findAll);


}