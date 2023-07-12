const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', {
    isHome: true
  });
});

router.get('/register', (req, res) => {
  res.render('register', {
    isRegister: true
  });
})

module.exports = router;