const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    const data = {
      message: '🚀 Service is running',
    }
  
    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
