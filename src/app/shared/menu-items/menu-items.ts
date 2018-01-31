import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  // {
  //   state: 'home',
  //   name: 'Home',
  //   type: 'link',
  //   icon: 'home'
  // },
  // {
  //   state: 'projects',
  //   name: 'Projects',
  //   type: 'link',
  //   icon: 'library_books',
  // },
  // {
  //   state: 'timesheets',
  //   name: 'Timesheets',
  //   type: 'link',
  //   icon: 'access_time'
  // },
  {
    state: 'powerBI',
    name: 'PowerBI',
    type: 'link',
    icon: 'library_books',
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
