const router = require('express').Router();

// Show home page
router.get('/', (req, res) => {
  res.render('index', {
    isHome: true
  });
});

// Show register page
router.get('/register', (req, res) => {
  res.render('register', {
    isRegister: true
  });
})

// Show dashboard page
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
})

module.exports = router;