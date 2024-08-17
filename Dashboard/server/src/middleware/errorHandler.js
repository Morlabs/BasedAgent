// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = err;
    console.log('ERROR:', err);
    if (err.isJoi || err.hasOwnProperty('sqlMessage')) {
      err.status = 422;
    }
    res.reply({ data: err.message, statusCode: err.status || 400 });
  };
  
  module.exports = errorHandler;
  