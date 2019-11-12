const User = require("./user.model.js");

exports.login = (req, res) => {
  User.login(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.send(500);      
    });
}

exports.register = (req, res) => {
  User.register(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.send(500);
    });
}