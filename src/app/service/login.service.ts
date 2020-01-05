import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {
    this.getProfile();
  }

  getProfile() {
    this.http
      .get(`${environment.url}api/v1/user/me`, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .subscribe(
        data => {
          console.log(data);
          localStorage.setItem('classLinked', JSON.stringify(data['classLinked']));
        },
        err => {
          if (err.status === 406) {
            // this.resources.clearToken(this.router);
          }
        }
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.url}api/v1/user/login`, { email, password })
      .pipe(
        map(response => {
          console.log("here", response);
          localStorage.setItem("token", 'JWT ' + response.token);
          localStorage.setItem("admin", (response.admin).toString());
          this.getProfile();
          return response;
        }),
        catchError(err => {
          //   this.errorHandler.showNoty({
          //     text: err.error.message
          //   });
          alert(err.error.message || err.message);
          return err;
        })
      );
  }
}
