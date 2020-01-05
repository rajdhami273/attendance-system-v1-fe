import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: "root"
})

export class SubjectsService {

    url: any = environment.url + 'api/v1/subjects';

    constructor(
        private http: HttpClient
    ) { }

    getSubjectsOfClass(id) {
        return this.http.get<any>(
            this.url + '/get-subjects-of-class/' + id,
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
        );
    }

    getSubject(id) {
        return this.http.get<any>(
            this.url + '/' + id,
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
        );
    }

    saveAttendance(data) {
        return this.http.post<any>(
            this.url + 'save-attendance/',
            data,
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
        );
    }
}
