const { controllerErr, responseBuilder } = require('../helper/responseBuilder');
const IntegrationsService = require('../services/integrations.service');

const getIntegrations = async (req, res) => {
    try {
      const { hasError, message, err, data } = await IntegrationsService.get(req);
      const status = hasError ? 400 : 200;
      responseBuilder(res, status, message, hasError ? err : data);
    } catch (err) {
      console.log('=== ERR ===', err);
      controllerErr(res, err);
    }
  };


  const updateIntegrations = async (req, res) => {
    try {
      const { hasError, message, err, data } = await IntegrationsService.update(req);
      const status = hasError ? 400 : 200;
      responseBuilder(res, status, message, hasError ? err : data);
    } catch (err) {
      console.log('=== ERR ===', err);
      controllerErr(res, err);
    }
  };
  

  module.exports = {
    getIntegrations,
    updateIntegrations,
  }