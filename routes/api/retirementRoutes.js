const express = require("express");
const router = express.Router();
const retirementCtrl = require("../../controllers/api/retirementCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn")

module.exports = router;