import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../service/login.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private loginService: LoginService, private router: Router) {}

  login(form) {
    form.submitted = true;
    if (!form.valid) {
      return false;
    }
    this.loginService.login(this.email, this.password).subscribe(
      data => {
        if (data) {
          console.log(data);
          localStorage.setItem("admin", data.admin);
          this.router.navigate(["/year"]);
        }
      },
      err => {
        console.log(err);
        alert(err.error.message || err.message);
      }
    );
  }

  get email() {
    return this.loginForm.get("email").value;
  }
  get password() {
    return this.loginForm.get("password").value;
  }
  ngOnInit() {
    localStorage.clear();
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }
}
