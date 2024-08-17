const { controllerErr, responseBuilder } = require('../helper/responseBuilder');
const profileService = require('../services/profile.service');

const getProfile = async (req, res) => {
    try {
      const { hasError, message, err, data } = await profileService.get(req);
      const status = hasError ? 400 : 200;
      responseBuilder(res, status, message, hasError ? err : data);
    } catch (err) {
      console.log('=== ERR ===', err);
      controllerErr(res, err);
    }
  };


  const updateProfile = async (req, res) => {
    try {
      const { hasError, message, err, data } = await profileService.update(req);
      const status = hasError ? 400 : 200;
      responseBuilder(res, status, message, hasError ? err : data);
    } catch (err) {
      console.log('=== ERR ===', err);
      controllerErr(res, err);
    }
  };
  

  module.exports = {
    getProfile,
    updateProfile,
  }