const express = require("express");
const router = express.Router();
const retirementCtrl = require("../../controllers/api/retirementCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn")

router.post("/", ensureLoggedIn, retirementCtrl.setRetirementGoal);
router.patch("/", ensureLoggedIn, retirementCtrl.editRetirementGoal);

module.exports = router;