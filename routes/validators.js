const { check, validationResult } = require('express-validator')

const userValidations = (req, res, next) => {
  const mappedErrors = validationResult(req)

  if (!mappedErrors.isEmpty()) {
    const formError = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    }

    mappedErrors.array().forEach((err) => {
      if (err.param === "firstName") formError.firstName = err.msg
      if (err.param === "lastName") formError.lastName = err.msg
      if (err.param === "email") formError.email = err.msg
      if (err.param === "password") formError.password = err.msg
      if (err.param === "confirmPassword") formError.password = err.msg
    })
    const err = Error("Bad request")
    err.errors = formError
    err.status = 400;
    err.title = "Bad Request"
    return next(err)
  }
  next()
}
// ALL VALIDATION ARRAYS ARE PLACED WITHIN ARRAY BELOW

const userValidators = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name ")
    .isLength({ max: 50 })
    .withMessage("First name cannot exceed 50 characters!"),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name ")
    .isLength({ max: 50 })
    .withMessage("Last name cannot exceed 50 characters!"),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid email ")
    .isLength({ max: 75 })
    .withMessage("Email address cannot exceed 75 characters!")
    .isEmail()
    .withMessage('Please provide a valid email ')
    .custom(value => {
      return User.findOne({ where: { email: value } })
        .then(user => {
          if (user) return Promise.reject("Email address is already being used ")
        })
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password ")
    .isLength({ min: 9 })
    .withMessage("Please provide a password at least 9 characters long "),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage("Please confirm password ")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match!!!")
      }
      return true
    }),
  userValidations
]





module.exports = userValidators
