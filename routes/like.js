const express = require('express')
const router = express.Router()
const {Post, Like} = require('../models')

// Like post
router.post('/:postId', async (req, res) => {
    if (!req.session.auth){
        res.redirect('/login')
        return
    }

    try{
        let post = await Post.findByPk(req.params.postId)
        console.log('-------------------------')
        console.log(post)
        if (post === null){
            res.status(404).redirect('/')
            return
        }
        const like = await Like.create({
            user_id: req.session.user.id,
            post_id: req.params.postId
        })
        res.status(200).json({message: 'Like created!', like: like})
    }catch{
        res.status(500).redirect('/')
    }
})

module.exports = router