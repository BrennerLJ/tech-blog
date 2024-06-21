// import Express router
const router = require('express').Router();

// import route modules
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// use the imported route modules and define their paths
router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
