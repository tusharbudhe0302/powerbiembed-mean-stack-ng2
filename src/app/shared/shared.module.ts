import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ToggleFullscreenDirective } from './full-screen/toggle-fullscreen.directive';

import { MenuItems } from './menu-items/menu-items';

@NgModule({
  imports: [ 
    //InMemoryWebApiModule.forRoot(InMemoryTimesheetService)
  ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective
   ],
  providers: [ 
    DatePipe,
    MenuItems
   ]
})

export class SharedModule { }
