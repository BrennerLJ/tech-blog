// import Express router, models and authentication middleware
const router = require('express').Router();
const { Post, Comments, User } = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
    try {
      const dbPostData = await Post.findAll({
        include: {model: User},
        order: [['date_created', 'DESC']],
      });
      
      const homePost = dbPostData.map((post) =>
        post.get({ plain: true })
      );

      res.render('homepage', {
        homePost,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  //goes to post page by id
  router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
          id: req.params.id
      },
      attributes: [
          'id',
          'title',
          'content',
          'date_created'
      ],
      include: [{
              model: Comments,
              attributes: ['id', 'content', 'post_id', 'date_created', 'user_id'],
              include: {
                  model: User,
                  attributes: ['name']
              }
          },
          {
              model: User,
              attributes: ['name']
          }
      ]
  })
  .then(dbPostData => {
      if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
      }
      const post = dbPostData.get({ plain: true });
      console.log(post);
      res.render('post', 
        { 
          post,
          loggedIn: req.session.loggedIn 
        });
  
  
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
  });


module.exports = router;