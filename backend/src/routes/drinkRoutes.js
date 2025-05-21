const express = require('express');
const router = express.Router();
const DrinkController = require('../controllers/drinkController.js');

router.post('/create/drink', DrinkController.create);

router.get('/get/drinks', DrinkController.getAll);

router.get('/get-by/:id', DrinkController.getById);

router.put('/update-by/:id', DrinkController.update);

router.delete('/delete-drink-by/:id', DrinkController.delete);

module.exports = router;