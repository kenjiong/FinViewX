const express = require("express");
const router = express.Router();
const liabilitiesCtrl = require("../../controllers/api/liabilitiesCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn")

module.exports = router;