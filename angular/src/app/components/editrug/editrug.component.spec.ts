import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrugComponent } from './editrug.component';

describe('EditrugComponent', () => {
  let component: EditrugComponent;
  let fixture: ComponentFixture<EditrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditrugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
