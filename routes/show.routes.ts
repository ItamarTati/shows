const express = require('express')
const router = express.Router()
const showController = require('../controllers/show.controller.ts');

router.get('/', showController.findAll);

router.post('/', showController.create);

router.get('/:id', showController.findOne);

router.put('/:id', showController.update);

router.delete('/:id', showController.delete);
module.exports = router