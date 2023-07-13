const router = require('express').Router();
const User = require('../models/User');

function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;

  if (!isAuthenticated) return res.redirect('/login');

  next();
}

// Show Homepage
router.get('/', (req, res) => {
  res.render('index', {
    isHome: true,
    isLoggedIn: req.session.user_id
  });
});

// Show Login Page
router.get('/login', (req, res) => {
  if (req.session.user_id) return res.redirect('/dashboard')

  return res.render('login', {
    isLogin: true
  });
});

// Show Register Page
router.get('/register', (req, res) => {
  if (req.session.user_id) return res.redirect('/dashboard')

  res.render('register', {
    isRegister: true
  });
});

// Show Dashboard Page
router.get('/dashboard', isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.user_id);
  // The user IS logged in
  res.render('dashboard', {
    email: user.email
  });
});

module.exports = router;