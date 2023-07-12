const router = require('express').Router();
const User = require('../models/User')

router.post('/register', async (req, res) => {
    // User.create(req.body)
    //     .then(newUser => {

    //     })

    // ES7 equivalent to the above:

    const newUser = await User.create(req.body);

    res.redirect('/dashboard');
})

module.exports = router;