const express = require("express");
const router = express.Router();
const assetsCtrl = require("../../controllers/api/assetsCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn")

router.post("/", ensureLoggedIn, assetsCtrl.createAsset);
router.patch("/", ensureLoggedIn, assetsCtrl.editAsset);

module.exports = router;