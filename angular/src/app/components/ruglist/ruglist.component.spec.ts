import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuglistComponent } from './ruglist.component';

describe('RuglistComponent', () => {
  let component: RuglistComponent;
  let fixture: ComponentFixture<RuglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
