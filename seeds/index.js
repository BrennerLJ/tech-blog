// import Sequelize connection
const sequelize = require("../config/connection");

// import functions to seed users, posts and comments
const seedUsers = require("./userData");
const seedPost = require("./postData");
const seedComments = require("./commentData");

// function to seed all the data
const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPost();

  await seedComments();

  process.exit(0);
};

seedAll();