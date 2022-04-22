import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardData } from 'src/app/shared/overview-card/overview-card.component';

@Component({
  selector: 'app-compare-record',
  templateUrl: './compare-record.component.html',
  styleUrls: ['./compare-record.component.scss']
})
export class CompareRecordComponent implements OnInit {

  records: any;
  compareTitle = 'Comparison chart'
  // chart data
  chartData: any[] = [];
  view: [number, number] = [500, 500];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Price in dollar($)';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(public route: ActivatedRoute, private router: Router) {
    const ids: any = this.router.getCurrentNavigation()?.extras.state;
    if (!ids) {
      router.navigate(['/home'], { replaceUrl: true })
    } else {
      this.records = ids.id;
      this.mapDataToChart(this.records);
      console.log(this.records)
    }

  }
  ngOnInit(): void {
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  mapDataToChart(data: CardData[]) {

    data.forEach((record) => {
      const data = {
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
      this.chartData.push(data);
    })

  }

  getAbsolutePrice(price: string) {
    return parseFloat(price.replace(/\$|,/g, ''))
  }
}
