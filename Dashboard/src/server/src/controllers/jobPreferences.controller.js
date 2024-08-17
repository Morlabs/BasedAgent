const { controllerErr, responseBuilder } = require('../helper/responseBuilder');
const jobPreferencesService = require('../services/jobPreferences.service');

const getJobPreferences = async (req, res) => {
    try {
      const { hasError, message, err, data } = await jobPreferencesService.get(req);
      const status = hasError ? 400 : 200;
      responseBuilder(res, status, message, hasError ? err : data);
    } catch (err) {
      console.log('=== ERR ===', err);
      controllerErr(res, err);
    }
  };


  const updateJobPreferences = async (req, res) => {
    try {
      const { hasError, message, err, data } = await jobPreferencesService.update(req);
      const status = hasError ? 400 : 200;
      responseBuilder(res, status, message, hasError ? err : data);
    } catch (err) {
      console.log('=== ERR ===', err);
      controllerErr(res, err);
    }
  };
  

  module.exports = {
    getJobPreferences,
    updateJobPreferences,
  }