// import Express router and comments model
const router = require("express").Router();
const { Post, Comments, User } = require("../../models");

// create a new comment
router.post("/", async (req, res) => {
  console.log(req.body, req.session.user_id);
  try {
    const comment = await Comment.create({
      comment_body: req.body.comment_body,
      post_id: req.body.post_id,
      user_id: req.session.user_id || req.body.user_id,
    });

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// read all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Post,
          attributes: ['id'],
        },
      ],
    });
    res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// updates a comment
router.put('/:id', async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedComment[0]) {
      res.status(400).json({ message: 'No comment found with that id!' });
      return;
    }

    console.log('Comment updated!');
    res.status(200).json(updatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// deletes a comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!comment) {
      res.status(404).json({ message: 'No comment found with that id!' });
      return;
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;