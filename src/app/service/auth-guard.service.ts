import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService {
  helper = new JwtHelperService();

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log(this.router.routerState.snapshot.url);
    let token = localStorage.getItem("token");
    console.log(this.helper.decodeToken(token));
    let access = token && !this.helper.isTokenExpired(token);
    // console.log(access, token);
    if (!access) {
      console.log(state.url);
      localStorage.setItem("redirectUrl", state.url);
      localStorage.clear();
      this.router.navigate(["/login"]);
    }
    return access;
  }
  constructor(private router: Router) {}
}
