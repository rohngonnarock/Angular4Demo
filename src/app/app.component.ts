import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular App';
  public currentStep: number;
  public values: any[];
  constructor(
    private _dataService: DataService, private router: Router,
  ) {
    this.currentStep = 0;
  }
  showDetail(id: void) {
    this.router.navigate(['/home', id]);
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

