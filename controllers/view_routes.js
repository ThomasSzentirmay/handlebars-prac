const router = require('express').Router();

// Show home page
router.get('/', (req, res) => {
  res.render('index', {
    isHome: true
  });
});

// Show login page
router.get('/login', (req, res) => {
  res.render('login', {
    isLogin: true
  });
})

// Show register page
router.get('/register', (req, res) => {
  res.render('register', {
    isRegister: true
  });
})

// Show dashboard page
router.get('/dashboard', (req, res) => {
  console.log(req.session);
  res.render('dashboard');
})

module.exports = router;