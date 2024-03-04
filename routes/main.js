const express = require('express')
const router = express.Router()
const path = require('path')


router.get('/', (req, res) => {
    if (!req.session.auth) {
        res.redirect('/users/login')
    } else {
        res.render('home',
            {
                user: req.session.user,
                activeUser: req.session.user
            })
    }
})



module.exports = router