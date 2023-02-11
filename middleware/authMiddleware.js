const jwt = require('jsonwebtoken');
const Worker = require('../models/worker');
const Client = require('../models/client')

const checkWorker = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'apna secret', async (err, decodedToken) => {
      try {
        let user = await Worker.findById(decodedToken.id);
        if (user) {
          next()
        }
        else {
          res.redirect('/login')
        }
      }
      catch (err) {
        res.send(err)
      }
    });
  } else {
    res.redirect('/login')
  }
};

const checkClient = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'apna secret', async (err, decodedToken) => {
      try {
        let user = await Client.findById(decodedToken.id);
        if (user) {
          next()
        }
        else {
          res.redirect('/login2')
        }
      }
      catch (err) {
        res.send(err)
      }
    });
  } else {
    res.redirect('/login2')
  }
};


module.exports = { checkClient, checkWorker };