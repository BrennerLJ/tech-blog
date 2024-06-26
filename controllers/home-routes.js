// import Express router, models and authentication middleware
const router = require('express').Router();
const { Post, Comments, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: Comments,
          },
        ]
      });

      const blogPosts = postData.map((blogPost) =>
      blogPost.get({ plain: true })
      );

      res.render("homepage", {
        blogPosts,
        logged_in: req.session.logged_in,
      });
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get("/blogPost/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comments,
          include: [User],
        }
      ]
    });

    const blogPost = postData.get({ plain: true });

    res.render("blogPost", {
      ...blogPost,
      logged_in: req.session.logged_in,
    });
    } catch (err) {
      res.status(500).json(err);
      res.redirect("/login");
    }
  });

  router.get("/dashboard", withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Post,
            include: [User],
          },
            {
              model: Comments,
            },
          ]
        });

        const user = userData.get({ plain: true });
        res.render("dashboard", {
          ...user,
          logged_in: true,
        });
        } catch (err) {
          res.status(500).json(err);
        }
      });
      
      router.get("/create", async (req, res) => {
        try {
          if (req.session.logged_in) {
            res.render("create", {
              logged_in: req.session.logged_in,
              userId: req.session.user_id,
            });
            return;
          } else {
            res.redirect("/login");
          }
          } catch (err) {
            res.status(500).json(err);
          }
        });

        router.get("/create/:id", async (req, res) => {
          try {
            const postData = await Post.findByPk(req.params.id, {
              include: [
                {
                  model: User,
                  attributes: ["name"],
                },
                {
                  model: Comments,
                  include: [User],
                },
              ]
            });

            const blogPost = postData.get({ plain: true });

            if (req.session.logged_in) {
              res.render("edit", {
                ...blogPost,
                logged_in: req.session.logged_in,
                userId: req.session.user_id,
              });
              return;
              } else {
                res.redirect("/login");
              }
              } catch (err) {
                res.status(500).json(err);
              }
        });

        router.all("/login", (req, res) => {
          if (req.session.logged_in) {
            res.redirect("/dashboard");
            return;
          }

          res.render("login");
        });

module.exports = router;