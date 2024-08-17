const express = require('express');
const allControllers = require('../controllers');

const router = express.Router();

router.post('/login', allControllers.userLogin)

router.get('/job-preferences/:id', allControllers.getJobPreferences);
router.patch('/job-preferences/:id', allControllers.updateJobPreferences);

router.get('/integrations/:id', allControllers.getIntegrations);
router.patch('/integrations/:id', allControllers.updateIntegrations);

router.get('/profile/:id', allControllers.getProfile)
router.patch('/profile/:id', allControllers.updateProfile)

router.get('/account/:id', allControllers.getAccount);
router.patch('/account/:id', allControllers.updateAccount);

router.post('/reviewer-signup', allControllers.reviewerSignup);


module.exports = router;
