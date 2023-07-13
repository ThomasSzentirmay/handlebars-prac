const router = require('express').Router();
const User = require('../models/User')

router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.redirect('/dashboard');
    } catch (err) {
        const dupeEmail = err.errors.find(e => e.path === 'email');

        // if email already exists, redirect them to the login page
        if (dupeEmail) res.redirect('/login');
    }
})

module.exports = router;