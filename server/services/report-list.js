const request = require('request');
const config = require('../config/app.config');

const groupId = config.groupId.toString();

module.exports.getReports = function (accessToken) {

    const reportsUrl = 'https://api.powerbi.com/v1.0/myorg/groups/' + groupId + '/reports';
    return new Promise(function (resolve, reject) {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + accessToken
        };
        request.get({
            url: reportsUrl,
            headers: headers

        }, function (err, reports) {
            if (err) {
                console.log('Error in genrating report list ! : \n' + err);
                return reject(err);
            }
            else {
                console.log('Report list is sucessfully genrated !');
                const reportsData = JSON.parse(reports.body);
                const reportsResponse = [];
                for (let i = 0; i < reportsData.value.length; i++) {
                    const reportEmbadded = {
                        id: reportsData.value[i].id,
                        name: reportsData.value[i].name,
                        embedUrl: reportsData.value[i].embedUrl
                    }
                    reportsResponse.push(reportEmbadded);
                }
                resolve(reportsResponse);
            }
        });
    });
};