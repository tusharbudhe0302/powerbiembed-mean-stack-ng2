import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as pbi from 'powerbi-client';

import { PowerBIService } from './powerbi.service';
import { IReports, IDashboards, IWorkspaces } from './powerbi.component.interface'

@Component({
    selector: 'app-root',
    templateUrl: './powerbi.component.html',
    styleUrls: ['./powerbi.component.css']
})
export class PowerBIComponent {
    title: string;
    reports: IReports[];
    dashboards: IDashboards[];
    workspaces: IWorkspaces[];
    showTabs: boolean;
    constructor(private powerBIService: PowerBIService, private route: ActivatedRoute, private router: Router) {
        this.title = 'Power BI';
    }
    showDahsbaord(dashboardItem) {
        this.powerBIService.getEmbedTokens(dashboardItem.id).subscribe(token => {
            console.log(dashboardItem.id);
            console.log(dashboardItem.embedUrl);
            this.showTabs = false;
            this.showReport(token.embedToken, dashboardItem.embedUrl, dashboardItem.id);
        });
    }
    showReport(embaddedToken, embedUrl, embedReportId) {
        const models = pbi.models;
        // Configuration used to describe the what and how to embed.
        let config = {
            type: 'dashboard',
            tokenType: models.TokenType.Embed,
            accessToken: embaddedToken,
            embedUrl: embedUrl,
            id: embedReportId
        };
        // Grab the reference to the div HTML element that will host the report.
        let reportContainer = <HTMLElement>document.getElementById('reportContainer');
        // Embed the report and display it within the div container.
        let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        let report = powerbi.embed(reportContainer, config);
        // Report.off removes a given event handler if it exists.
        report.off("loaded");
        // Report.on will add an event handler which prints to Log window.
        report.on("loaded", function () {
            console.log("report loaded sucessfully!");
        });
    }

    ngOnInit() {
        // this.powerBIService.getTokens().subscribe(tokens => {
        //   console.log('token genrated!');
        //   this.showReport(tokens.embedToken);
        // });
        this.showTabs = true;
        this.powerBIService.getReportList().subscribe(reportList => {
            // console.log(reportList);
            this.reports = reportList;
            // console.log(this.reports);
        });
        this.powerBIService.getDashboarList().subscribe(dashboardList => {
            // console.log(dashboardList);
            this.dashboards = dashboardList;
            // console.log(this.dashboards);
        });
        this.powerBIService.getWorkspacetList().subscribe(workspacesList => {
            // console.log(workspacesList);
            this.workspaces = workspacesList;
            // console.log(this.workspaces);
        });


    }
}
