import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: "root"
})

export class AttendanceService {

    url: any = environment.url + 'api/v1/lectures';

    constructor(
        private http: HttpClient
    ) { }

    saveAttendance(data) {
        return this.http.post<any>(
            this.url + '/add-lectures',
            data,
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
        );
    }

    getReport(data) {
        return this.http.post<any>(
            this.url + '/report',
            data,
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
        );
    }
}
