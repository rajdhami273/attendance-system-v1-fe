import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ReportService {
  // url: any = environment.url + 'api/v1/';

  constructor(private http: HttpClient) {}

  downloadReportExcel(url) {
    return this.http.get<any>(url, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
  }
}
