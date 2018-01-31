# Power BI Embed using MEAN stack and angular2
PowerBI embed reports using nodeJS as back-end and angular2 as front-end. It's doing authentication using Azure AD account.

# MEAN Stack Prerequisites

Express.js: http://expressjs.com/

Angular 2: http://angular.io

Node.js: https://nodejs.org 

## Set up.
Make sure you have angular cli installed.
```bash
$ npm install -g angular-cli
```

Clone the repo
```bash
$ git clone https://github.com/tusharbudhe0302/powerbiembed-mean-stack-ng2.git
$ cd powerbiembed-mean-stack-ng2
```

Install dependencies
```bash
$ npm install
```

- Go to directory Server --> Config --> Edit app.config.js
    * username  Username Azure
    * password Password Azure
    * clientId  Applicaton ID of app registered via Azure Active Directory - stored in config
    * dashboardId Dashbord ID for embedded reports
    * groupId Group ID for embedded reports
    * azureADAurthUrl URL for Azure AD user authentication 
    * reportsUrl  URL for genrate embedded token

[How to get all above ?](https://www.youtube.com/watch?v=GPHHdDRSlis)

[Javascript Dveloper](https://www.youtube.com/watch?v=FChEDsz8u28)

[Stack Overflow](https://stackoverflow.com/questions/47194412/node-js-app-integration-with-power-bi-rest-api)


Start API 
```bash
$ npm run startapi
```

- Make sure to test API first : 
     - [x] http://localhost:3000/api/aurth/accesstoken
     - [x] http://localhost:3000/api/aurth/reportembaddedtoken/ReportId [How to get Report Id?](https://www.youtube.com/watch?v=GPHHdDRSlis)
     - [x] http://localhost:3000/api/aurth/dashboardembaddedtoken/DashboardId [How to get Dashboard Id?](https://www.youtube.com/watch?v=GPHHdDRSlis)
     - [x] http://localhost:3000/api/collection/reports
     - [x] http://localhost:3000/api/collection/dashboards


Run the app
```bash
$ npm start
```

If you got saas or css exception.Please execute below command and Run the app again.
```bash
$ npm run nodesaas
```

