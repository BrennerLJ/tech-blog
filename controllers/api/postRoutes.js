// import Express router and models
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts
router.post('/', withAuth, async (req, res) =>{
    console.log(req.body);
    try{
        const newBlogPost = await Post.create({
        ...req.body,
        userId: req.session.userId,
    });

    res.status(200).json(newBlogPost);

    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

// get User by ID
router.put('/:id', withAuth, async (req, res) =>{
    try{
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id
            },
    });

    if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
    }

    res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// delete an existing post
router.delete('/:id', withAuth, async (req, res)=>{
    console.log(req.params.id);
    try{
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;