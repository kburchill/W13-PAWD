const { User } = require('./db/models');


const loginUser = (req, res, user) => {
  req.session.userAuth = { userId: user.id };
}

const logoutUser = (req, res) => {
  delete req.session.userAuth;
}

const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users');
  }
  return next();
};


const restoreUser = async (req, res, next) => {
  if (req.session.userAuth) {
    const { userId } = req.session.userAuth;
    try {
      const user = await User.findByPk(userId);
      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
      }
    } catch (err) {
      res.locals.authenticated = false;
      next(err);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
};

module.exports = { restoreUser, requireAuth, loginUser, logoutUser }
