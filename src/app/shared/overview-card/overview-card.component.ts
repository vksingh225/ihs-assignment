import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent implements OnInit {

  @Input() cardData: any;

  @Input() goToUrl: string = '';

  @Output() checkboxChange = new EventEmitter;

  @Input() checkLength: number = 0;

  checkLimit = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
  }
  
  goToDetail(data: CardData) {
    const navData = {
      ...data
    }
    this.router.navigate([this.goToUrl], { relativeTo: this.activatedRoute, state: navData });
  }

  onModelChange(event: any, id: string) {
    if (!event.target.checked) {
      this.checkboxChange.emit({checked: event.target.checked, id: id});
    } else {
      if (this.checkLength + 1 == 4 ) {
        alert("You can only select max 3 records to compare.")
        event.preventDefault();
      } else {
        this.checkboxChange.emit({checked: event.target.checked, id: id});
      }
    }
  }

}

export interface CardData {
  _id: string,
  company: string,
  isActive: boolean,
  currentPrice: string,
  price1MonthAgo: string,
  price6MonthsAgo: string,
  price1YearAgo: string,
  price5YearsAgo: string,
  industryType: string,
  email: string,
  phone: string,
  address: string,
  about: string,
  registered: string
}