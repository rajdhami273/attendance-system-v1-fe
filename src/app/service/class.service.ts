import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: "root"
})

export class ClassService {

    url: any = environment.url + 'api/v1/class';

    constructor(
        private http: HttpClient
    ) { }

    getClass() {
        return this.http.get<any>(
            this.url + '/',
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
        );
    }

}
