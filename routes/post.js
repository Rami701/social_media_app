const express = require('express')
const router = express.Router()
const { Post } = require('../models')
const { PostMedia } = require('../models')
const { sequelize } = require('../models');
const path = require('path')
const postMediasBasePath = require('../models/post').postMediaBasePath
const uploadPath = path.join('public', postMediasBasePath)
const multer = require('multer')
const upload = multer({
    dest: uploadPath
})

// new post route
router.post('/', upload.any(), async (req, res) => {
    if (!req.session.auth){
        res.redirect('login')
        return
    } 

    try{
        // Start the transaction
        const transaction = await sequelize.transaction();

        // Create the post
        const post = await Post.create({
            user_id: req.session.user.id,
            caption: req.body.caption
        }, { transaction });

        // Create associated media files
        for (let i = 0; i < req.files.length; i++){
            const imageName = req.files[i].filename;
            await PostMedia.create({
                post_id: post.id,
                position: i,
                media_path: imageName
            }, { transaction });
        }
        
        // Commit the transaction
        await transaction.commit();

        res.redirect('/');
    }catch (e){
        // Rollback the transaction in case of error
        if (transaction) await transaction.rollback();
        res.status(500).json({message: 'Error: ' + e});
    }
});




module.exports = router