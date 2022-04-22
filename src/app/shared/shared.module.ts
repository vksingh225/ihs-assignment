import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header/app-header.component';
import { OverviewCardComponent } from './overview-card/overview-card.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { ChartCardComponent } from './chart-card/chart-card.component';

@NgModule({
  declarations: [AppHeaderComponent, OverviewCardComponent, ChartCardComponent],
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  exports: [AppHeaderComponent, OverviewCardComponent, NgxChartsModule, ChartCardComponent]
})
export class SharedModule { }
