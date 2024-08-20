const reviewersService = require('../services/reviewers.service');

const reviewerSignup = async (req, res) => {
    try {
      const { hasError, message, err, data } = await reviewersService.signup(req);
      if(hasError) {
        return res.status(400).send({
            details: err,
            message: message,
        })
      }else {
        return res.status(400).send({
            reviewer: data,
            message: message,
        })
      }
    } catch (err) {
        return res.status(500).send({
            details: err,
            message: message,
        })
    }
  };
  

  module.exports = {
    reviewerSignup
  }