// import models
const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

// define relationships between the models
Comments.belongsTo(Post);
Post.hasMany(Comments);

Post.belongsTo(User);
User.hasMany(Post);

Comments.belongsTo(User);
User.hasMany(Comments);

module.exports = { User, Post, Comments };