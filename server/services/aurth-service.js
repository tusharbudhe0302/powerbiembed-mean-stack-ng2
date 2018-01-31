const request = require('request');
const fs = require('fs');
const config = require('../config/app.config');

const username = config.username.toString();
const password = config.password.toString();
const clientId = config.clientId.toString();
const groupId = config.groupId.toString();
const azureADAurthUrl = config.azureADAurthUrl.toString();


/*
 * After Azure AD autehntication it will genrate access token
 */
module.exports.getAccessToken = function () {
    return new Promise(function (resolve, reject) {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const formData = {
            grant_type: 'password',
            client_id: clientId,
            resource: 'https://analysis.windows.net/powerbi/api',
            scope: 'openid',
            username: username,
            password: password
        };
        request.post({
            url: azureADAurthUrl,
            form: formData,
            headers: headers
        }, function (err, result, body) {
            if (err) {
                console.log('Error in genrating access token  : \n' + err);
                return reject(err);
            }
            else {
                const bodyObj = JSON.parse(body);
                fs.writeFileSync('./keys/accessToken.txt', bodyObj.access_token);
                console.log('Azure AD authentication sucessfull!');
                resolve(bodyObj.access_token);
            }
        });
    });
};

/* getEmbedToken : to genrate embadded token
 * @param {*} accessToken Genrate run-time if users authenticate by Azure AD 
 * @param {*} groupId Power BI embadded api.If we wpuld like to share same report to mutipule users in same group
 * @param {*} dashboardId Power BI embadded api for indivisual report or dashboard
 */
module.exports.getEmbedToken = function (accessToken, reportTypeId, reportType) {
    const genrateTokenUrl = 'https://api.powerbi.com/v1.0/myorg/groups/' + groupId + '/' + reportType + '/' + reportTypeId + '/GenerateToken';
    return new Promise(function (resolve, reject) {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + accessToken
        };
        const formData = {
            'accessLevel': 'View'
        };
        request.post({
            url: genrateTokenUrl,
            form: formData,
            headers: headers

        }, function (err, result, body) {
            if (err) {
                console.log('Error in genrating Embaded Token : \n' + err);
                return reject(err);
            }
            else {
                console.log('Genrate embed token sucessfull!');
                const bodyObj = JSON.parse(body);
                fs.writeFileSync('./keys/embedToken.txt', bodyObj.token);
                resolve(bodyObj.token);
            }

        });
    });
};
