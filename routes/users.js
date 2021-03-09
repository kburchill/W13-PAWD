const express = require("express");
const router = express.Router();
const { User } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { userValidators } = require("./validators");
const bcrypt = require('bcryptjs');
const { loginUser, logoutUser } = require('../auth');

/* GET users listing. */
router.get(
	"/",
	csrfProtection,
	asyncHandler(async (req, res) => {
		const user = await User.build();

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
	asyncHandler(async (req, res, next) => {
		const { firstName, lastName, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({ firstName, lastName, email, hashedPassword });
		loginUser(req, res, user);

		return req.session.save((e) => {
			if (e) return next(e);
			return res.redirect('/projects')
		});
	})
);

module.exports = router;
