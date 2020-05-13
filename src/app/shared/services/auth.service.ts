import { BaseService } from './../core/base.service'
import { Injectable, Injector } from '@angular/core'
import { map } from 'rxjs/operators'
import { User, Administrator } from 'src/app/account/models/register'
import { AccountsService } from 'src/app/account/services/accounts.service'
import { Observable, BehaviorSubject } from 'rxjs'
import { JwtHelperService } from '@auth0/angular-jwt'
import { tokenGetter } from 'src/app/app.module'

@Injectable({
    providedIn: 'root',
})
export class AuthService extends BaseService<any> {
    private currentUserSubject = new BehaviorSubject<any>(this.decodeToken())
    public currentUser = this.currentUserSubject.asObservable()

    private isAuthSubject = new BehaviorSubject<boolean>(this.hasToken())
    public isAuthed = this.isAuthSubject.asObservable()

    constructor(injector: Injector, private jwtService: JwtHelperService) {
        super(injector)
    }

    get accountAdminastratorInfo() {
        const token = tokenGetter()
        const isExpired = this.jwtService.isTokenExpired(token)
        const tokenDecoded = this.jwtService.decodeToken(token)
        if (!isExpired && tokenDecoded.accountId) {
            return tokenDecoded as Administrator
        }
        return null
    }
    get accountInfo() {
        const token = tokenGetter()
        const isExpired = this.jwtService.isTokenExpired(token)
        const tokenDecoded = this.jwtService.decodeToken(token)
        if (!isExpired && tokenDecoded.accountId) {
            return tokenDecoded as User
        }
        return null
    }

    login(email: string, password: string) {
        return this.post('Authorization/login', { email, password }).pipe(
            map((result: any) => {
                if (!result.isSucceeded) {
                    return false
                }

                localStorage.setItem('token', result.data)
                const currentUser = this.decodeToken(result.data)
                this.currentUserSubject.next(currentUser) // <-- pump the value in here
                this.isAuthSubject.next(true)
                return true
            })
        )
    }

    isLoggedIn() {
        return this.isAuthSubject.value
    }

    private decodeToken(token?: any) {
        token = token ? token : localStorage.getItem('token')
        const helper = new JwtHelperService()
        return helper.decodeToken(token)
    }

    private hasToken() {
        return !!localStorage.getItem('token')
    }

    logout() {
        this.isAuthSubject.next(false)
        localStorage.removeItem('token')
    }

    register(user: User): Observable<User> {
        const body = {
            accountName: user.accountName,
            primaryAdminFirstlName: user.primaryAdminFirstlName,
            primaryAdminLastName: user.primaryAdminLastName,
            primaryAdminEmail: user.primaryAdminEmail,
            primaryAdminPassword: user.primaryAdminPassword,
            accountMobile: user.accountMobile,
            countryId: user.countryId,
        }
        return this.post('Account', body)
    }

    updateProfile(model: User) {
        return this.put('Administrator', model)
    }

    // getUserData(): Observable<Administrator> {
    //     return this.get('Administrator')
    // }
}
