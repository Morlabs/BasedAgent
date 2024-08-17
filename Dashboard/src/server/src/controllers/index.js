const { userLogin } = require('./users.controller');
const { getJobPreferences, updateJobPreferences } = require('./jobPreferences.controller');
const { getIntegrations, updateIntegrations } = require('./integrations.controller');
const { getProfile, updateProfile } = require('./profile.controller');
const { getAccount, updateAccount } = require('./account.controller');
const { reviewerSignup } = require('./reviewers.controller');

module.exports = {
    userLogin,
    getJobPreferences,
    updateJobPreferences,
    getIntegrations,
    updateIntegrations,
    getProfile,
    updateProfile,
    getAccount,
    updateAccount,
    reviewerSignup
}