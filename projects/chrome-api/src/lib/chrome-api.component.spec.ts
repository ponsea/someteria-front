import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromeApiComponent } from './chrome-api.component';

describe('ChromeApiComponent', () => {
  let component: ChromeApiComponent;
  let fixture: ComponentFixture<ChromeApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChromeApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChromeApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
