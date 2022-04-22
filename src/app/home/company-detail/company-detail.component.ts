import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LegendPosition } from '@swimlane/ngx-charts';
import { CardData } from 'src/app/shared/overview-card/overview-card.component';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent {

  detailHeader = 'Company Profile '
  companyDetail: any;

  chartData: any[] = [];
  view: [number, number] = [500, 500];

  // options
  legend: boolean = true;
  legendPosition = LegendPosition.Right;
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
    this.companyDetail = this.router.getCurrentNavigation()?.extras.state
    if (!this.companyDetail) {
      router.navigate(['/home'], { replaceUrl: true })
    } else {
      this.chartData.push(this.mapDataToChart(this.companyDetail))
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
