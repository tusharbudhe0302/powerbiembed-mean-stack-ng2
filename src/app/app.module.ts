import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataTableModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AngularPowerbiComponent } from './angular-powerbi/angular-powerbi.component';
import { PowerBIComponent } from './powerbi/powerbi.component';

import { SharedModule } from './shared/shared.module';

import { AppService } from './app.service';
import { PowerBIService } from './powerbi/powerbi.service';

const ROUTES = [
  { path: '', redirectTo: 'powerBI', pathMatch: 'full'},
  { path: '',  component: LayoutComponent, 
    children: [
      { path: 'powerBI', component: AngularPowerbiComponent}
    ]
  },
  { path: '**', redirectTo: 'powerBI'}
];
@NgModule({
  declarations: [
    AppComponent,
    PowerBIComponent,
    AngularPowerbiComponent,
    LayoutComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MdNativeDateModule,
    FlexLayoutModule,
    DataTableModule,
    SharedModule,
    RouterModule.forRoot(ROUTES, {useHash: true})
  ],
  providers: [AppService, PowerBIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
