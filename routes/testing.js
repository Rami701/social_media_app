const express = require('express')
const router = express.Router()
const {Post} = require('../models')
const {PostMedia} = require('../models')
const {Like} = require('../models')
const {User} = require('../models')
const {Comment} = require('../models')

router.get('/', async (req, res) => {
    const post = await Post.findByPk(1, { include: [{ model: PostMedia }, { model: Like, include: { model: User } }, { model: User }, {model: Comment, include: {model: User}}] });


    res.send(post)
})

router.post('/like', async (req, res) => {
    const like = await Like.create({
        user_id: 1,
        post_id: 1,
    })
    res.send(like)
})

router.post('/comment', async (req, res) => {
    const comment = await Comment.create({
        user_id: 1,
        post_id: 1,
        comment: 'hello'
    })
    res.send(comment)
})

module.exports = router