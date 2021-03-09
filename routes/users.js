const express = require("express");
const router = express.Router();
const { User } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { userValidators } = require("./validators");

/* GET users listing. */
router.get(
	"/",
	csrfProtection,
	userValidators,
	asyncHandler(async (req, res) => {
		const user = User.build();

		res.render("sign-up", {
			title: "sign-up",
			user,
			csrfToken: req.csrfToken(),
		});
	})
);

router.post(
	"/",
	csrfProtection,
	userValidators,
	asyncHandler(async (req, res) => {
		const user = User.build();
	})
);

module.exports = router;
