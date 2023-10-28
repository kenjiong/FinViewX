const express = require("express");
const router = express.Router();
const liabilitiesCtrl = require("../../controllers/api/liabilitiesCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn")

router.post("/", ensureLoggedIn, liabilitiesCtrl.createLiability);
router.patch("/", ensureLoggedIn, liabilitiesCtrl.editLiability);

module.exports = router;