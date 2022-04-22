import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { CompareRecordComponent } from './compare-record.component';

describe('CompareRecordComponent', () => {
  let component: CompareRecordComponent;
  let fixture: ComponentFixture<CompareRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        RouterModule.forRoot([])
      ],
      declarations: [ CompareRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
