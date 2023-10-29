const express = require("express");
const router = express.Router();
const assetsCtrl = require("../../controllers/api/assetsCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn")

router.get("/:userId", ensureLoggedIn, assetsCtrl.getAllAssets);
router.post("/", ensureLoggedIn, assetsCtrl.createAsset);
router.patch("/:assetId", ensureLoggedIn, assetsCtrl.editAsset);
router.delete("/:assetId", ensureLoggedIn, assetsCtrl.deleteAsset);

module.exports = router;