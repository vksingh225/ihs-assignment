import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LegendPosition } from '@swimlane/ngx-charts';
import { CardData } from '../overview-card/overview-card.component';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss']
})
export class ChartCardComponent implements OnInit {

  @Input() cardData: CardData;

  @Input() goToUrl: string = '';

  @Output() checkboxChange = new EventEmitter;

  @Input() checkLength: number = 0;

  chartData: any[] = [];

  // options
  legend: boolean = false;
  legendPosition = LegendPosition.Below;
  value: [number, number] = [245, 300]
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Price in dollar($)';
  timeline: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.chartData.push(this.mapDataToChart(this.cardData))
  }

  goToDetail(data: CardData) {
    const navData = {
      ...data
    }
    this.router.navigate([this.goToUrl], { relativeTo: this.activatedRoute, state: navData });
  }

  onModelChange(event: any, id: string) {
    if (!event.target.checked) {
      this.checkboxChange.emit({ checked: event.target.checked, id: id });
    } else {
      if (this.checkLength + 1 == 4) {
        alert("You can only select max 3 records to compare.")
        event.preventDefault();
      } else {
        this.checkboxChange.emit({ checked: event.target.checked, id: id });
      }
    }
  }

  mapDataToChart(record: CardData) {
    return {
      name: record.company,
      series: [
        {
          name: "5y ago",
          value: this.getAbsolutePrice(record.price5YearsAgo)
        },
        {
          name: "1y ago",
          value: this.getAbsolutePrice(record.price1YearAgo)
        },
        {
          name: "6 month ago",
          value: this.getAbsolutePrice(record.price5YearsAgo)
        },
        {
          name: "1 month ago",
          value: this.getAbsolutePrice(record.price5YearsAgo)
        },
        {
          name: "Current",
          value: this.getAbsolutePrice(record.currentPrice)
        }
      ]
    }
  }

  getAbsolutePrice(price: string) {
    return parseFloat(price.replace(/\$|,/g, ''))
  }

}
