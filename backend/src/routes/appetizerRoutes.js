const express = require("express");
const router = express.Router();
const appetizerController = require('../controllers/appetizerController.js');
const uploadAppetizerImage = require('../middlewares/uploadImage.js');
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post("/", authenticateJWT, uploadAppetizerImage(), appetizerController.create);
router.get("/", appetizerController.getAll);
router.get("/:id", appetizerController.getById);
router.put("/:id", authenticateJWT, uploadAppetizerImage(), appetizerController.update);
router.delete("/:id", authenticateJWT, appetizerController.delete);

module.exports = router;