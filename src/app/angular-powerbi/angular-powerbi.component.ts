import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as pbi from 'powerbi-client';
import { PowerBIService } from '../powerbi/powerbi.service';
import { IReports, IDashboards, IWorkspaces } from '../powerbi/powerbi.component.interface';
import { factories } from 'powerbi-client';

@Component({
    selector: 'app-angular-powerbi',
    templateUrl: './angular-powerbi.component.html',
    styleUrls: ['./angular-powerbi.component.css']
})

export class AngularPowerbiComponent {
    title: string;
    reports: IReports[];
    dashboards: IDashboards[];
    workspaces: IWorkspaces[];
    showTabs: boolean;
    constructor(private powerBIService: PowerBIService, private route: ActivatedRoute, private router: Router) {
        this.title = 'Power BI';
    }
    showDahsbaord(dashboardItem) {
        this.showTabs = false;
        this.powerBIService.getDashbaordEmbedTokens(dashboardItem.id).subscribe(token => {
            console.log(dashboardItem.id);
            console.log(dashboardItem.embedUrl);
            this.displyPowerBI(token.embedToken, dashboardItem.embedUrl, dashboardItem.id, 'dashboard');
        });
    }
    showReport(dashboardItem) {
        this.showTabs = false;
        this.powerBIService.getReportEmbedTokens(dashboardItem.id).subscribe(token => {
            console.log(dashboardItem.id);
            console.log(dashboardItem.embedUrl);
            this.displyPowerBI(token.embedToken, dashboardItem.embedUrl, dashboardItem.id, 'report');
        });
    }
    displyPowerBI(embaddedToken, embedUrl, embedReportId, type) {
        const models = pbi.models;
        let config;
        // Configuration used to describe the what and how to embed.
        if (type === 'report') {
            console.log('In report tab!');
            config = {
                type: type,
                tokenType: models.TokenType.Embed,
                accessToken: embaddedToken,
                embedUrl: embedUrl,
                id: embedReportId,
                settings: {
                    filterPaneEnabled: false,
                    navContentPaneEnabled: false
                }
            };
        } else {
            config = {
                type: type,
                tokenType: models.TokenType.Embed,
                accessToken: embaddedToken,
                embedUrl: embedUrl,
                id: embedReportId
            };
        }
        let Container ;
        // Grab the reference to the div HTML element that will host the report.
         Container = <HTMLElement>document.getElementById('reportContainer');
        // Embed the report and display it within the div container.
        let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        let report = powerbi.embed(Container, config);
        // Report.off removes a given event handler if it exists.
        report.off("loaded");
        // Report.on will add an event handler which prints to Log window.
        report.on("loaded", function () {
            console.log("report loaded sucessfully!");
        });
    }

    ngOnInit() {
        this.showTabs = true;
        this.powerBIService.layoutShowTabs.subscribe(() => { this.showTabs = true; });
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
