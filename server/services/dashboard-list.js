const request = require('request');
const config = require('../config/app.config');

const groupId = config.groupId.toString();

module.exports.getDashboards = function (accessToken) {
    const dashboardssUrl = 'https://api.powerbi.com/v1.0/myorg/groups/' + groupId + '/dashboards';
    return new Promise(function (resolve, reject) {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + accessToken
        };
        request.get({
            url: dashboardssUrl,
            headers: headers
        }, function (err, dashboards) {
            if (err) {
                console.log('Error in genrating dashbaord list : \n' + err);
                return reject(err);
            }
            else {
                console.log('Dashboard list is sucessfully genrated !');
                const dashboardsData = JSON.parse(dashboards.body)
                resolve(dashboardsData.value);
            }
        });
    });
};