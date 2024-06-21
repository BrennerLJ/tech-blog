// import Express router and comments model
const router = require("express").Router();
const { Comments } = require("../../models");

// define post route to create a new comment
router.post("/", async (req, res) => {
  console.log(req.body, req.session.user_id);
  try {
    const newComment = {
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    };
    const commentdata = await Comments.create(newComment);
    console.log(commentdata);
    res.json(commentdata);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

module.exports = router;