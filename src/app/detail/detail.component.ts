import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public data :any
  constructor(private _dataService: DataService) { 
    this.data = _dataService.getItem();
  }

  ngOnInit() {
  }

}
