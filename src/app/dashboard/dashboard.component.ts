import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Angular App';
  public currentStep: number;
  public values: any[];
  constructor(
    private _dataService: DataService, private router: Router,
  ) {
    this.currentStep = 0;
  }
  showDetail(id: void) {
    this._dataService.setItem(this.values, id)
    this.router.navigate(['/detail', id]);
  }
  back() {
    this.currentStep -= 5;
    this.getData()
  }
  next() {
    this.currentStep += 5;
    this.getData()
  }
  getData() {
    this._dataService
      .getData<any[]>(this.currentStep)
      .subscribe((data: any[]) => this.values = data,
      error => (err) => { }, () => { });
  }
  ngOnInit() {
    this.getData()
  }

}
