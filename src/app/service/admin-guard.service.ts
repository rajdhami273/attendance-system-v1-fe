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
export class AdminGuardService {
  helper = new JwtHelperService();

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log(this.router.routerState.snapshot.url);
    let token = localStorage.getItem("token");
    let isAdmin = localStorage.getItem("admin");
    console.log(this.helper.decodeToken(token));
    let access = token && !this.helper.isTokenExpired(token) && isAdmin === 'true';
    // console.log(access, token);
    // if (!access) {
    //   console.log(state.url);
    //   localStorage.setItem("redirectUrl", state.url);
    //   localStorage.clear();
    //   this.router.navigate(["/login"]);
    // }
    return access;
  }
  constructor(private router: Router) {}
}
