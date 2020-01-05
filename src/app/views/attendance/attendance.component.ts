import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AttendanceService } from "../../service/attendance.service";
import { StudentsService } from "../../service/students.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as moment from "moment";
import { Location } from '@angular/common';
declare var jQuery: any;
@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.css"]
})
export class AttendanceComponent implements OnInit {
  @ViewChild("submitModal") submitModal: ElementRef;
  
  students = [];
  classId: any;
  subjectId: any;
  disableButton = false;
  savingData = false;
  dateForm: FormGroup;
  date: any = null;
  moment = moment;

  constructor(
    private router: ActivatedRoute,
    private attendanceService: AttendanceService,
    private studentService: StudentsService,
    private location: Location
  ) {
    this.classId = router.snapshot.paramMap.get("classId");
    if (JSON.parse(localStorage.getItem('classLinked')).indexOf(this.classId) === -1) {
      this.location.back();
    }
    this.subjectId = router.snapshot.paramMap.get("subId");
  }

  getAttendanceData() {
    this.studentService.getStudentsOfClass(this.classId).subscribe(
      data => {
        if (data) {
          this.students = data.map(e => {
            return { ...e, attendance: true };
          });
        }
      },
      err => {
        alert(err.error.message || err.message);
        console.log(err);
      }
    );
  }

  isMarkAll(val) {
    let r = true;
    this.students.map(item => {
      if (val === "p" && !item.attendance) {
        r = false;
      }
      if (val === "a" && item.attendance) {
        r = false;
      }
    });
    return r;
  }

  markAll(val) {
    this.students.map(item => {
      if (val === "p") {
        item.attendance = true;
      } else {
        item.attendance = false;
      }
    });
  }

  getTotal(type) {

    return this.students.filter(
      (item, index) => {
        if ((type === "p") && item.attendance) {
          return item;
        }
        if ((type === "a") && !item.attendance) {
          return item;
        }
      }
    ).length;
  }

  saveAttendance() {
    // form.submitted = true;
    if (!this.date) {
      return false;
    }
    this.savingData = true;
    this.disableButton = true;
    const obj = {
      class: this.classId,
      startTime: Date(),
      endTime: Date(),
      date: moment(this.date, "YYYY-MM-DD").format(),
      subject: this.subjectId,
      students: this.students.map(e => {
        return { student: e._id, attendance: e.attendance };
      })
    };
    console.log(obj);
    // return;
    this.attendanceService.saveAttendance(obj).subscribe(
      data => {
        if (data) {
          console.log(data);
          this.savingData = false;
          this.disableButton = true;
          jQuery(this.submitModal.nativeElement).modal("show");
        }
      },
      err => {
        console.log(err);
        this.savingData = false;
        this.disableButton = false;
      }
    );
  }

  // get date() {
  //   return this.dateForm.get("date").value;
  // }
  ngOnInit() {
    // this.dateForm = new FormGroup({
    //   date: new FormControl(null, [Validators.required])
    // });
    this.getAttendanceData();
  }
}
