const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      //role: req.body.role,
    });

    user
    .save()
    .then(user => {
      // Use toPublic method
      const publicUser = user.toPublic();

      res.status(201).json({
        user: publicUser,
        message: 'User created successfully!'  
      });
    })
    .catch(error => {
      if (error.name === 'ValidationError' && error.errors.email.kind === 'unique') {
        res.status(400).json({ error: 'Email déjà utilisé', message: 'Données invalides' });
      } else {
        res.status(400).json({ error: error.message, message: 'Données invalides' });
      }
    });
  });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }
    bcrypt.compare(req.body.password, user.password).then((valid) => {
      if (!valid) {
        return res.status(401).json({ error: "Incorrect password!" });
      }
      res.status(200).json({
        token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        }),
      })
    })
    .catch((error) => res.status(500).json({ error: error.message }));
  })    
  .catch((error) => res.status(500).json({ error: error.message }));
};
