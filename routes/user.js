const express = require('express')
const router = express.Router()
const { User } = require('../models')
const profileImageBasePath = require('../models/user').profileImageBasePath
const bcrypt = require('bcryptjs')
const path = require('path')
const fs = require('fs')
const uploadPath = path.join('public', profileImageBasePath)
const multer = require('multer')
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/jpg']
const upload = multer({
    dest: uploadPath
})


// Creating user route
router.post('/', /*upload.single('profileImage'),*/ async (req, res) => {
    let user = new User()
    if (req.body.firstName == '' ||
        req.body.lastName == '' ||
        req.body.email == '' ||
        req.body.password == '' ||
        req.body.username == ''
    ) {
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.username = req.body.username
        user.email = req.body.email
        res.status(400).render('register', { user: user, errorMessage: 'All fields are required' })
        return
    }
    // const imageName = req.file != null ? req.file.filename : null
    const passwordHash = hashPassword(req.body.password)

    try {
        user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: passwordHash,
            username: req.body.username,
            profileImageName: 'default.jpg',
            bio: 'Hi, I love this app!'
        })
        res.redirect('/users/login')
    } catch {
        res.render('register', { user: user })
    }

})

// login page route
router.get('/login', (req, res) => {
    if (req.session.auth) {
        res.redirect('/')
    } else {
        const user = new User()
        res.render('login', { email: '' })
    }
})

// register page route
router.get('/register', (req, res) => {
    if (!req.session.auth) {
        const user = new User()
        res.render('register', { user: user })
    } else {
        res.json({ message: 'Logout to register a new account' })
    }
})

// Login user route
router.post('/login', async (req, res) => {
    if (req.session.auth) {
        res.redirect('/')
    } else {
        const email = req.body.email
        const password = req.body.password

        if (email == '' || password == '') {
            res.status(400).render('login', { errorMessage: 'Fields can\'t be empty', email: email })
            return
        }
        let user
        try {
            user = await User.findOne({ where: { email: email } })
            if (user) {
                const check = await checkPassword(password, user.password)
                if (check == -1) {
                    res.status(500).redirect('/users/login')
                    return
                }
                if (check) {
                    user.password = ''
                    req.session.user = user
                    req.session.auth = true
                    res.redirect('/')
                } else {
                    res.render('login', { errorMessage: 'Wrong password', email: email })
                }
            } else {
                res.render('login', { errorMessage: 'User not found', email: email })
            }

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Error finding user' })
        }
    }
})

// logout user route
router.post('/logout', async (req, res) => {
    if (req.session.auth) {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({ message: 'Error logging out' })
            } else {
                // todo: redirect user to the login page.
                res.status(200).json({ message: 'Logout successful' })
            }
        })
    } else {
        res.status(400).json({ message: 'No active session found' })
    }
})

// Update user profile image
router.put('/:id/profileImage', upload.single('profileImage'), async (req, res) => {
    if (!req.session.auth) {
        res.redirect('login')
        return
    }
    // Get the user's current profile image name
    const user = await User.findByPk(req.params.id);
    const previousImageName = user.profileImageName;

    // Delete the previous image file if it exists and it's not the default image
    if (previousImageName && previousImageName !== 'default.jpg') {
        fs.unlinkSync(path.join(uploadPath, previousImageName));
    }

    const imageName = req.file != null ? req.file.filename : 'default.jpg'
    console.log(imageName)
    try {
        await User.update({ profileImageName: imageName }, {
            where: {
                id: req.params.id
            }
        });
        req.session.user.profileImageName = imageName
        res.redirect(`/users/${req.params.id}`)
    } catch {
        res.json({ message: 'Error while updating image' })
    }

})

// Open user profile page route
router.get('/:id', async (req, res) => {
    if (!req.session.auth) {
        res.redirect('login')
        return
    }

    let user
    try {
        user = await User.findByPk(req.params.id)
        if (user) {
            user.password = ''
            const isSameUser = req.session.user.id == user.id ? true : false
            res.render('profile',
                {
                    user: user,
                    activeUser: req.session.user,
                    isSameUser: isSameUser
                })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch {
        res.redirect('/')
    }
})

function hashPassword(plainText) {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(plainText, salt)
}

async function checkPassword(password, hash) {
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    } catch {
        return -1
    }
}


module.exports = router