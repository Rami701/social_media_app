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
        const likes = await Like.findAll({
            where: {
                user_id: req.session.user.id,
                post_id: req.params.postId
            }
        });

        console.log(likes); // Check the array of likes

        if (likes.length > 0) {
            // Access the user_id of the first like in the array
            const firstLike = likes[0];
            console.log(firstLike.user_id);
            
            // Perform operations based on whether the user has already liked the post
            await Like.destroy({
                where: {
                    user_id: req.session.user.id,
                    post_id: req.params.postId
                }
            });
            res.status(200).json({ message: 'Like removed' });
            return;
        }

        // If the user has not liked the post, create a new like
        const newLike = await Like.create({
            user_id: req.session.user.id,
            post_id: req.params.postId
        });
        res.status(200).json({ message: 'Like created' });
    } catch (error) {
        console.error(error);
        res.status(500).redirect('/');
    }
});


module.exports = router