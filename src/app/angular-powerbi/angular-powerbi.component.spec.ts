import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPowerbiComponent } from './angular-powerbi.component';

describe('AngularPowerbiComponent', () => {
  let component: AngularPowerbiComponent;
  let fixture: ComponentFixture<AngularPowerbiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPowerbiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPowerbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
