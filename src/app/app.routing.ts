import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { SubjectsComponent } from "./views/subjects/subjects.component";
import { ReportComponent } from './views/report/report.component';
import { AttendanceComponent } from './views/attendance/attendance.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AdminGuardService } from './service/admin-guard.service';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "year",
    canActivate: [AuthGuardService],
    pathMatch: "full"
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404"
    }
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500"
    }
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page"
    }
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register Page"
    }
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    canActivate: [AuthGuardService],
    data: {
      title: "Home"
    },
    children: [
      {
        path: "base",
        loadChildren: () =>
          import("./views/base/base.module").then(m => m.BaseModule)
      },
      {
        path: "buttons",
        loadChildren: () =>
          import("./views/buttons/buttons.module").then(m => m.ButtonsModule)
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./views/chartjs/chartjs.module").then(m => m.ChartJSModule)
      },
      {
        path: "year",
        data: {
          title: 'Year'
        },
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            m => m.DashboardModule
          )
      },
      {
        path: "icons",
        loadChildren: () =>
          import("./views/icons/icons.module").then(m => m.IconsModule)
      },
      {
        path: "notifications",
        loadChildren: () =>
          import("./views/notifications/notifications.module").then(
            m => m.NotificationsModule
          )
      },
      {
        path: "theme",
        loadChildren: () =>
          import("./views/theme/theme.module").then(m => m.ThemeModule)
      },
      {
        path: "widgets",
        loadChildren: () =>
          import("./views/widgets/widgets.module").then(m => m.WidgetsModule)
      },
      {
        path: "report",
        data: {
          title: 'Report'
        },
        canActivate: [AdminGuardService],
        component: ReportComponent
      },
      {
        path: "subjects/:classId",
        component: SubjectsComponent,
        data: {
          title: 'Subjects'
        },
      },
      {
        path: "attendance/:classId/:subId",
        component: AttendanceComponent,
        data: {
          title: 'Attendance'
        }
      }
    ]
  },
  { path: "**", component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
