// import Comments
const { Comments } = require("../models");

// data for all Comments
const data = [
  {
    content: "Have you played The Legend of Zelda?",
    user_id: 1,
    post_id: 1,
  },
  {
    content: "I have and it's my favorite!",
    user_id: 1,
    post_id: 1,
  },
  {
    content: "I would have to agree.",
    user_id: 2,
    post_id: 2,
  },
];

const seed = () => Comments.bulkCreate(data);

module.exports = seed;