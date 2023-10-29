const express = require("express");
const router = express.Router();
const liabilitiesCtrl = require("../../controllers/api/liabilitiesCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn")

router.get("/", ensureLoggedIn, liabilitiesCtrl.getAllLiabilities);
router.post("/", ensureLoggedIn, liabilitiesCtrl.createLiability);
router.patch("/:liabilityId", ensureLoggedIn, liabilitiesCtrl.editLiability);
router.delete("/:liabilityId", ensureLoggedIn, liabilitiesCtrl.deleteLiability);

module.exports = router;