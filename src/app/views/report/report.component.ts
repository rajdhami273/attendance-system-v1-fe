import { Component, OnInit } from "@angular/core";
import { SubjectsService } from "../../service/subjects.service";
import { AttendanceService } from "../../service/attendance.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ClassService } from "../../service/class.service";
import * as moment from "moment";
import { ReportService } from "../../service/report.service";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"]
})
export class ReportComponent implements OnInit {
  moment = moment;
  subjects: any = [];
  class: any = [];
  report: any = [];
  reportForm: FormGroup;
  downloadUrl: any;
  gettingReports = false;
  constructor(
    private subjectService: SubjectsService,
    private classService: ClassService,
    private attendanceService: AttendanceService,
    private reportService: ReportService
  ) {}

  getSubject() {
    this.subjectService.getSubjectsOfClass(this.classId).subscribe(
      data => {
        if (data) {
          this.subjects = data;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getClass() {
    this.classService.getClass().subscribe(
      data => {
        if (data) {
          this.class = data;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  downloadReport() {
    window.open(this.downloadUrl, '_blank');
    return;
    this.reportService.downloadReportExcel(this.downloadUrl).subscribe(
      data => {},
      err => {
        alert(err.error.message || err.message);
      }
    );
  }

  getReport(form) {
    this.gettingReports = true;
    let dU;
    dU = this.downloadUrl;
    this.downloadUrl = null;
    form.submitted = true;
    if (!form.valid) {
      return false;
    }
    const obj = {
      classId: this.classId,
      startDate: new Date(moment(this.startDate, "YYYY-MM-DD").format()),
      endDate: new Date(moment(this.endDate, "YYYY-MM-DD").format())
    };
    console.log(obj);
    this.getSubject();
    this.attendanceService.getReport(obj).subscribe(
      data => {
        if (data) {
          console.log(data);
          this.report = data.data;
          this.downloadUrl = data.fileUrl;
          this.gettingReports = false;
        }
      },
      err => {
        this.downloadUrl = dU;
        this.gettingReports = false;
        alert(err.error.message || err.message);
      }
    );
  }

  getPercent(val, tot) {
    return Number((Number(val) / Number(tot)) * 100).toFixed(2);
  }

  get classId() {
    return this.reportForm.get("classId").value;
  }
  get startDate() {
    return this.reportForm.get("startDate").value;
  }
  get endDate() {
    return this.reportForm.get("endDate").value;
  }

  ngOnInit() {
    this.reportForm = new FormGroup({
      classId: new FormControl("", [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required])
    });
    // this.getSubject();
    this.getClass();
  }
}
