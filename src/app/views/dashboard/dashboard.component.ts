import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ClassService } from '../../service/class.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  class: any = [];

  constructor(
    private classService: ClassService
  ) {}

  getClass() {
    this.classService.getClass().subscribe(
      data => {
        if (data) {
          // console.log(data)
          this.class = data;
        }
      }, err => {
        console.log(err);
      }
    );
  }

  isValidUser(cid) {
    return JSON.parse(localStorage.getItem('classLinked')).indexOf(cid) > -1;
  }

  ngOnInit() {
    this.getClass();
  }
}
