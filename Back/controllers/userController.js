const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');


const User = require('../models/userModels');




exports.signup = (req, res, next) => {
  console.log("req.body.password", req.body)
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => {
      console.log("signup error", error);
      res.status(500).json({ error })
    });

};


exports.getAllusers = (req, res, next) => {
  console.log("getAllusers");
  User.find()
  .then((u) => res.status(200).json({ users: u}))
  .catch(error => res.status(400).json({ error }));

};

exports.login = (req, res, next) => {
    console.log("start login", req.body);
    User.findOne({ email: req.body.email })
    .then(user => {
      
      if (!user) {
        return res.status(400).json({ error: 'Utilisateur incorrect' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(400).json({ error: 'Mot de passe incorrect' });
          }

          const isAdmin = user.isAdmin ? user.isAdmin  : false;
          console.log("isAdmin", user.isAdmin)
          res.status(200).json({
            userId: user._id,
            isAdmin: isAdmin,
            token: jsonwebtoken.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
          });
        })
        .catch(error => {
          console.log("start bcrypt", error);
          res.status(500).json({ error })
        });
    })
    .catch(error => {
      console.log("User not found", error);
      res.status(500).json({ error })
    });
};

