const { controllerErr, responseBuilder } = require('../helper/responseBuilder');
const accountService = require('../services/account.service');

const getAccount = async (req, res) => {
    try {
      const { hasError, message, err, data } = await accountService.get(req);
      const status = hasError ? 400 : 200;
      responseBuilder(res, status, message, hasError ? err : data);
    } catch (err) {
      console.log('=== ERR ===', err);
      controllerErr(res, err);
    }
  };


  const updateAccount = async (req, res) => {
    try {
      const { hasError, message, err, data } = await accountService.update(req);
      const status = hasError ? 400 : 200;
      responseBuilder(res, status, message, hasError ? err : data);
    } catch (err) {
      console.log('=== ERR ===', err);
      controllerErr(res, err);
    }
  };
  

  module.exports = {
    getAccount,
    updateAccount,
  }