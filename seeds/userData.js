// import the USer model from the models directory
const { User } = require('../models');

// data for seeding the User table
const data = [
    {
        name: 'Brenner',
        password: 'jazz',
    },
    {
        name: 'Patrick',
        password: 'yo',
    },
    {
        name: 'Lorenzo',
        password: 'yoagain',
    }
];

// function to seed the User table with the provided data
const seed = () => User.bulkCreate(data);

module.exports = seed;