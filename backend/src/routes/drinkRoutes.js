const express = require('express');
const router = express.Router();
const DrinkController = require('../controllers/drinkController.js');
const uploadDrinkImage = require('../middlewares/uploadImage.js');

router.post('/create/drink',uploadDrinkImage(), DrinkController.create);

router.get('/get/drinks', DrinkController.getAll);

router.get('/get-by/:id', DrinkController.getById);

router.put('/update-by/:id', uploadDrinkImage(), DrinkController.update);

router.delete('/delete-drink-by/:id', DrinkController.delete);

module.exports = router;