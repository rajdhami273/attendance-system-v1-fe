import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: "root"
})

export class StudentsService {

    url: any = environment.url + 'api/v1/students';

    constructor(
        private http: HttpClient
    ) { }

    getStudentsOfClass(id) {
        return this.http.get<any>(
            this.url + '/get-students-of-class/' + id,
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
        );
    }

    getStudent(id) {
        return this.http.get<any>(
            this.url + '/' + id,
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
        );
    }

}
