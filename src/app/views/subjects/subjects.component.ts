import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectsService } from '../../service/subjects.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  classId: any;
  subjects: any = [];

  constructor(
    private router: ActivatedRoute,
    private subjectService: SubjectsService,
    private location: Location
  ) {
    console.log(this.router.snapshot.paramMap.get('classId'));
    this.classId = this.router.snapshot.paramMap.get('classId');
    if (JSON.parse(localStorage.getItem('classLinked')).indexOf(this.classId) === -1) {
      this.location.back();
    }
  }

  getSubjects() {
    this.subjectService.getSubjectsOfClass(this.classId).subscribe(
      data => {
        if (data) {
          console.log(data)
          this.subjects = data;
        }
      }, err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.getSubjects();
  }

}
