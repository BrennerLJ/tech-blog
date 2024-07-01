// Placeholder for user-routes, to be updated when the need arises
const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// route for user login
router.post('/login', async (req, res) => {
    try {
        // find user in the database
        const userData = await User.findOne({
            where: {
                name: req.body.name,
            },
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username! Try again.' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password! Try again.' });
            return;
        }

        // save the user session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: userData, message: 'Successfully logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//get User by ID
router.get('/:id', async (req, res)=>{
    try{
      const userData = await User.findByPk(req.params.id, {exclude: 'password'})
      res.json(userData);
    }
    catch(err){
      res.status(400).json(err);
  
    }
  });

module.exports = router;