const handleServiceResponse = (success, data, message) => {
    if (success) {
      return {
        hasError : false,
        message,
        data: data
      };
    }else {
      return {
        hasError: true,
        message,
        err: data
      };
    }
  };
  
  module.exports = handleServiceResponse;
  