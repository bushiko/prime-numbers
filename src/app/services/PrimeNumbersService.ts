import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface PrimeNumbersRawResponse {
    primes: number[]
    sum: number
}

@Injectable()
export class PrimeNumbersService {
    constructor(
        private http: HttpClient,
    ) {}

    public findSum( limit: number ): Observable<PrimeNumbersRawResponse> {
        const params = {
            'limit': `${limit}`
        };
        return this.http.get<PrimeNumbersRawResponse>( environment.API_URL, { params } );
            // .pipe(
            //     map( (response: PrimeNumbersRawResponse) => {
            //         return response;
            //     })
            // )
    }
}