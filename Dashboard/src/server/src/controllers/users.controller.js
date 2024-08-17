const { Users } = require('../models');
const { controllerErr } = require('../helper/responseBuilder');

// TODO:: need confirmation
const userLogin = async (req, res) => {
    try {
      res.send({});
    } catch (err) {
      console.log('=== ERR ===', err);
      controllerErr(res, err);
    }
  };
  

  module.exports = {
    userLogin
  }