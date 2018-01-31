const express = require('express');
const router = express.Router();
const aurthService = require('../services/aurth-service');

// default routes
router.use(function (req, res, next) {
  next()
});

/* GET api listing. */
router.get('/accesstoken', (req, res) => {
  aurthService.getAccessToken().then(function (accessToken) {
    res.status(201).send({ accessToken: accessToken });
  }).catch(function (err) {
    res.status(403).send({ Message: 'Error in genrating access token', ErrorDetails: err });
  });
});

router.get('/dashboardembaddedtoken/:id', (req, res) => {
  const reportTypeId =req.params.id.toString();
  if (!reportTypeId) {
    res.status(400).send({ Message: 'Invaild report or dashbard id !', ErrorDetails: '' });
  }
  aurthService.getAccessToken().then(function (accessToken) {
    aurthService.getEmbedToken(accessToken, reportTypeId,'dashboards').then(function (embedToken) {
      res.status(201).send({ accessToken: accessToken, embedToken: embedToken });
    }).catch(function (err) {
      res.status(403).send({ Message: 'Error in genrating Embaded Token !', ErrorDetails: err });
    });
  }).catch(function (err) {
    res.status(403).send({ Message: 'Error in genrating access token', ErrorDetails: err });
  });
});

router.get('/reportembaddedtoken/:id', (req, res) => {
  const reportTypeId =req.params.id.toString();
  if (!reportTypeId) {
    res.status(400).send({ Message: 'Invaild report or dashbard id !', ErrorDetails: '' });
  }
  aurthService.getAccessToken().then(function (accessToken) {
    aurthService.getEmbedToken(accessToken, reportTypeId,'reports').then(function (embedToken) {
      res.status(201).send({ accessToken: accessToken, embedToken: embedToken });
    }).catch(function (err) {
      res.status(403).send({ Message: 'Error in genrating Embaded Token !', ErrorDetails: err });
    });
  }).catch(function (err) {
    res.status(403).send({ Message: 'Error in genrating access token', ErrorDetails: err });
  });
});

module.exports = router;