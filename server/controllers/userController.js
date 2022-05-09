const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const e = require("express");

const UsersController = {
  Create: async (req, res) => {    
    let user = await User.findOne({email: req.body.email});
    
    if (!user) {
      const user = new User(req.body)

      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
      // set user passwork to hased password
      user.password = await bcrypt.hash(user.password, salt);

      return user.save({
          username: user.username,
          email: user.email,
          password: user.password
        })
        .then(i => res.status(200).json(user.username))
        .catch(err => res.status(400).send('unable to save use to database'));
    } else {
      res.status(400).end('user already exists') 
    }

  },

  userProfile: async (req, res) => {

    const username = req.params.username;
    User.findOne({username: username}, (err, data) => {
      if (err) {
        const error = {
          status: `The user "${username}" has not been found`,
        }
        res.status(400).json({ error: error });
      } else {
        res.status(201).json(data);
      }
    })
    

  },

  login: async (req, res) => {
    const body = req.body;
    const user = await User.findOne({email:body.email});
    if(user) {
      //check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      console.log(validPassword)
      if (validPassword) {
        res.status(200).json(user.username);
        console.log('User logged in successfully')
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(400).json({ error: "User does not exit"});
    }
  }

}

module.exports = UsersController;