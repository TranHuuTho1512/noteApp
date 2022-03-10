const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const vetifyToken = require('../middleware/auth');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tranhuutho151220@gmail.com',//Email minh
        pass: 'thobatbai151200'
    },
    tls: {
        rejectUnauthorized: false
    }
});




//@route Put api/posts
//@desc Update post
//@access Private
router.put('/:id', vetifyToken, async (req, res) => {
    const { title, description, url, status, email } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: "Title is required" })
    }
    try {
        const mailOptions = {
            from: 'Tran Huu Tho <thotran151200@gmail.com>',
            to: `${email}`,// Email người nhận
            subject: 'Sending Email using Node.js',
            text: 'That was easy!',
            html: `<h1>${title}</h1>
            <h1>${url}</h1><h1>${title}</h1><h1>${title}</h1>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        let updatePost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
        }

        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new: true })

        // User not authorization to update post or post not found
        if (!updatePost) {
            return res.status(401).json({ success: false, message: "Post not found or user not authorised" })
        }
        res.json({ success: true, message: 'Excellent progress!', post: updatePost });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }


});



//@route Create api/posts
//@desc Get post
//@access Private

router.get('/', vetifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username']);
        res.json({ success: true, posts });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

})


//@route POST api/posts
//@desc Create post
//@access Private

router.post('/', vetifyToken, async (req, res) => {
    const { title, description, url, status, email } = req.body;
    console.log(req.body);
    if (!title) {
        return res.status(400).json({ success: false, message: "Title is required" })
    }
    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            email,
            user: req.userId
        })
        // res.send({ message: '222' });
        await newPost.save();

        res.json({ success: true, message: 'Happy learning', post: newPost });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
});

//@route DELETE api/posts
//@desc Delete post
//@access Private

router.delete('/:id', vetifyToken, async (req, res) => {

    try {
        const deletePostCondition = { _id: req.params.id, user: req.userId }
        const deletePost = await Post.findByIdAndDelete(deletePostCondition);

        // User is not authorised or post not found
        if (!deletePost) {
            return res.status(401).json({ success: false, message: "Post not found or user not authorised" })
        }
        res.json({ success: true, post: deletePost });
    }

    catch {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }


})
module.exports = router;
