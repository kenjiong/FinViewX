const express = require("express");
const router = express.Router();
const savingsCtrl = require("../../controllers/api/savingsCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn")

router.get("/:userId", ensureLoggedIn, savingsCtrl.getEmergencyFund);
router.post("/", ensureLoggedIn, savingsCtrl.setEmergencyFund);
router.patch("/:savingsId", ensureLoggedIn, savingsCtrl.editEmergencyFund);

module.exports = router;