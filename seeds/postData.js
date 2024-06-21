// import the Post model
const { Post } = require('../models');

// data for seeding the Post table
const data = [
    {
        title: "Post",
        content: "Hello world!",
        user_id: 1,
    },
    {
        title: "Food",
        content: "You can't go wrong with pizza!",
        user_id: 1,
    },
    {
        title: "Legend of Zelda",
        content: "I have played nearly all of the games.",
        user_id: 1,
    },
    {
        title: "Link",
        content: "hyaa huuaah yaa!",
        user_id: 1,
    }
];

// function to seed the Post tale with the provided data
const seed = () => Post.bulkCreate(data);

module.exports = seed;