import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OverviewCardComponent } from './overview-card.component';

describe('OverviewCardComponent', () => {
  let component: OverviewCardComponent;
  let fixture: ComponentFixture<OverviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ OverviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewCardComponent);
    component = fixture.componentInstance;
    component.cardData = {
      "_id": "5f6c682f89608746f71d69aa",
      "company": "SCENTRIC",
      "isActive": true,
      "currentPrice": "$2,267.54",
      "price1MonthAgo": "$964.34",
      "price6MonthsAgo": "$2,210.00",
      "price1YearAgo": "$1,415.86",
      "price5YearsAgo": "$4,544.07",
      "industryType": "BANKING",
      "email": "robynfranco@scentric.com",
      "phone": "+1 (940) 403-2862",
      "address": "853 Seigel Court, Ripley, Arkansas, 717",
      "about": "Non excepteur exercitation culpa nulla reprehenderit dolor mollit fugiat eu nulla. Amet sint voluptate tempor id mollit mollit. Ex ut ad fugiat laborum dolor laboris qui et Lorem ad esse. Officia id duis magna sit. Magna duis culpa ad sit eiusmod ea pariatur pariatur.\r\n",
      "registered": "2016-02-07T05:51:23 -06:-30"
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
