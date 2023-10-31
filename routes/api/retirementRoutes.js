const express = require("express");
const router = express.Router();
const retirementCtrl = require("../../controllers/api/retirementCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn")

router.get("/:userId", ensureLoggedIn, retirementCtrl.getRetirementGoal);
router.post("/", ensureLoggedIn, retirementCtrl.setRetirementGoal);
router.patch("/:retirementId", ensureLoggedIn, retirementCtrl.editRetirementGoal);

module.exports = router;