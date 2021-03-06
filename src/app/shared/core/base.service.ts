import { HttpClient } from '@angular/common/http'
import { Injector } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export class BaseService<T> {
    protected http: HttpClient
    private readonly baseUrl

    constructor(injector: Injector) {
        this.http = injector.get(HttpClient)
        this.baseUrl = environment.baseUrl
    }

    protected getAll(url: string): Observable<T[]> {
        return this.http
            .get(`${this.baseUrl}/${url}`)
            .pipe(map((data: T[]) => data))
    }
    getAllResult(url): Observable<T[]> {
        return this.http
            .get(`${this.baseUrl}/${url}`)
            .pipe(map((data: T[]) => data))
    }

    getById(url: string, id: string) {
        return this.get(`${url}/${id}`)
    }
    protected get(url: string): Observable<T> {
        return this.http
            .get(`${this.baseUrl}/${url}`)
            .pipe(map((data: T) => data))
    }

    protected post(url: string, data: any): Observable<T> {
        return this.http
            .post(`${this.baseUrl}/${url}`, data)
            .pipe(map((data: T) => data))
    }

    protected put(url: string, data: T): Observable<T> {
        return this.http
            .put(`${this.baseUrl}/${url}`, data)
            .pipe(map((data: T) => data))
    }

    protected remove(url: string, id: string | number): Observable<T> {
        return this.http
            .delete(`${this.baseUrl}/${url}/${id}`)
            .pipe(map((data: T) => data))
    }

    protected toQueryString(obj: object): string {
        return Object.keys(obj)
            .map((key) => key + '=' + obj[key])
            .join('&')
    }
}
