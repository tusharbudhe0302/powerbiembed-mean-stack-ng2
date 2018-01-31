const express = require('express');
const router = express.Router();

const dashboardService = require('../services/dashboard-list');
const reportService = require('../services/report-list');
const aurthService = require('../services/aurth-service');
const config = require('../config/app.config');

const workspaces = [{
    id: config.groupId,
    name: 'Power BI Embedded !'
}];

router.get('/dashboards', function (req, res) {
    aurthService.getAccessToken().then(function (accessToken) {
        dashboardService.getDashboards(accessToken).then(function (dashboards) {
            res.status(200).send(dashboards);
        }).catch(function (err) {
            console.log('Error in getting list of dashboards : \n' + err);
            res.status(403).send({ Message: 'Error in getting list of dashboard ', ErrorDetails: err });
        });
    }).catch(function (err) {
        console.log('Error in genrating access token  : \n' + err);
        res.status(403).send({ Message: 'Error in genrating access token', ErrorDetails: err });
    });
});

router.get('/workspaces', function (req, res) {
    aurthService.getAccessToken().then(function (accessToken) {
        res.status(200).send(workspaces);
    }).catch(function (err) {
        console.log('Error in genrating access token  : \n' + err);
        res.status(403).send({ Message: 'Error in genrating access token', ErrorDetails: err });
    });
});

router.get('/reports', function (req, res) {
    aurthService.getAccessToken().then(function (accessToken) {
        console.log('access token in report method');
        reportService.getReports(accessToken).then(function (reports) {
            res.status(200).send(reports);
        }).catch(function (err) {
            console.log('Error in getting list of reports : \n' + err);
            res.status(403).send({ Message: 'Error in getting list of reports ', ErrorDetails: err });
        });
    }).catch(function (err) {
        console.log('Error in genrating access token  : \n' + err);
        res.status(403).send({ Message: 'Error in genrating access token', ErrorDetails: err });
    });
});

module.exports = router;