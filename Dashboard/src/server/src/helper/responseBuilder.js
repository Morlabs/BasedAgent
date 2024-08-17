const responseBuilder = (res, status, message, data) => {
    const success = status >= 200 && status < 400;
    const response = {
      success,
      message,
      [success ? 'data' : 'err']: data
    };
    return res.status(status).send(response);
  };
  

  
  const controllerErr = async (res, err) => {
    return res.status(500).send({
      success: false,
      message: 'controller Err',
      err: err,
    });
  };
  
  
  
  
  
  module.exports = { responseBuilder, controllerErr };
  