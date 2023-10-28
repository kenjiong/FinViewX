const express = require("express");
const router = express.Router();
const assetsCtrl = require("../../controllers/api/assetsCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn")

module.exports = router;