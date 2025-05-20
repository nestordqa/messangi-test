import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SmsService {
    constructor(private http: HttpClient) { }

    sendSms(phone: string, message: string) {
        const payload = {
            from: environment.fromSender,
            to: phone,
            text: message
        };

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${environment.apiToken}`
        });

        return this.http.post(environment.apiEndpoint, payload, { headers }).pipe(
            tap(() => console.log('SMS enviado correctamente')),
            catchError(error => {
                console.error('Error enviando SMS:', error);
                return of(null);
            })
        );
    }
}
