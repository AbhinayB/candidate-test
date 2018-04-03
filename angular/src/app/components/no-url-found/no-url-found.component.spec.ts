import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoUrlFoundComponent } from './no-url-found.component';

describe('NoUrlFoundComponent', () => {
  let component: NoUrlFoundComponent;
  let fixture: ComponentFixture<NoUrlFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoUrlFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoUrlFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
