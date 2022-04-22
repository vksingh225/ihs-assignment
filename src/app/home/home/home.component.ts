import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardData } from 'src/app/shared/overview-card/overview-card.component';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeTitle = 'List of Financial Records'

  companyData: CardData[];
  events: string[] = [];
  model!: NgbDateStruct;
  date!: { year: number, month: number };
  searchText = '';

  filteredList: CardData[];

  checkBoxArray: string[] = [];

  chartToggle: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
    this.companyData = [];
    this.filteredList = [];
  }

  ngOnInit(): void {
    this.httpClient.get("assets/mock-data/mock-sharemarket-data.json").subscribe((data: any) => {
      this.companyData = data;
      this.assignCopy();
    })
  }

  trackId(item: any) {
    return item._id;
  }

  getCheckboxEvent(event: any) {
    if (event.checked) {
      this.checkBoxArray.push(event.id);
    } else {
      const index = this.checkBoxArray.indexOf(event.id);
      index != -1 ? this.checkBoxArray.splice(index, 1) : false;
    }
  }

  compareRecords() {
    if (this.checkBoxArray.length <= 1) {
      alert("Please select atleast 2 records to compare")
    } else {
      const navData = {
        id: this.getRecordsById(this.checkBoxArray)
      }
      this.router.navigate(['compare-record'], { relativeTo: this.activatedRoute, state: navData });
    }
  }

  getRecordsById(ids: string[]) {
    const records: CardData[] = [];
    ids.forEach((id) => {
      const data = this.companyData.filter((record: CardData) => id === record._id);
      data.length > 0 ? records.push(data[0]) : console.log(data.length);
    })
    return records;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  checkDate(model: any) {
    if (!model) {
      this.assignCopy();
    } else {
      this.filteredList = Object.assign([], this.companyData).filter((record: CardData) =>
        this.compareDate(model, record) === true
      )
    }
  }

  compareDate(input: any, record: CardData): boolean {
    const splitDate = record.registered.split(" ")
    const recordDate = new Date(splitDate[0]);

    if (input.year === recordDate.getFullYear()
      && input.month === recordDate.getMonth() + 1
      && input.day === recordDate.getDate()) {
      return true;
    }
    return false;
  }

  searchTextChange(str: string) {
    str = str.toLowerCase();
    if (str === '') {
      this.assignCopy();
    } else {
      this.filteredList = Object.assign([], this.companyData).filter((record: CardData) =>
        record.industryType.toLowerCase().includes(str) || record.company.toLowerCase().includes(str))
    }

  }

  assignCopy() {
    this.filteredList = Object.assign([], this.companyData);
  }

  onChartToggle(event: any) {
    this.chartToggle = event.target.checked;
  }


  goToDetail(data: CardData) {
    const navData = {
      ...data
    }
    this.router.navigate(['detail'], { relativeTo: this.activatedRoute, state: navData });
  }
}
