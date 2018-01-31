import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import * as Ps from 'perfect-scrollbar';

import { MenuItems } from '../shared/menu-items/menu-items';
import { PowerBIService } from '../powerbi/powerbi.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {

  private _router: Subscription;

  showSettings = false;
  collapseSidebar: boolean;
  compactSidebar: boolean;
  boxed: boolean;
  dark: boolean;
  url: string;

  @ViewChild('sidemenu') sidemenu;

  constructor(public menuItems: MenuItems, private router: Router, private powerBIService: PowerBIService) {
    this.collapseSidebar = false;
    this.compactSidebar = true;
  }

  ngOnInit(): void {

    //const elemSidebar = <HTMLElement>document.querySelector('.sidebar-panel .mat-sidenav-focus-trap .cdk-focus-trap-content');
    //const elemContent = <HTMLElement>document.querySelector('.mat-sidenav-content');

    // if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
    //   //Ps.initialize(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
    //   //Ps.initialize(elemContent, { wheelSpeed: 2, suppressScrollX: true });
    // }

    // this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
    //   this.url = event.url;
    //   if (this.isOver()) {
    //     this.sidemenu.close();
    //   }

    //   if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
    //     //Ps.update(elemContent);
    //   }
    // });
  }

  onShowTabs() {
    this.powerBIService.layoutShowTabs.emit();
  }
  @HostListener('click', ['$event'])
  onClick(e: any) {
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar-panel .mat-sidenav-focus-trap .cdk-focus-trap-content');
    setTimeout(() => {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        //Ps.update(elemSidebar);
      }
    }, 350);
  }

  // ngOnDestroy() {
  //   this._router.unsubscribe();
  // }

  isOver(): boolean {
    if (this.url === '/apps/messages' || this.url === '/apps/calendar' || this.url === '/apps/media' || this.url === '/maps/leaflet') {
      return true;
    } else {
      return window.matchMedia(`(max-width: 960px)`).matches;
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  menuMouseOver(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
      this.sidemenu.mode = 'side';
    }
  }
}
