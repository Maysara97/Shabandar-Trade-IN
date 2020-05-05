import { BaseService } from './../core/base.service'
import { Injectable, Injector } from '@angular/core'
import { map } from 'rxjs/operators'
import { User } from 'src/app/account/models/register'
import { AccountsService } from 'src/app/account/services/accounts.service'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AuthService extends BaseService<any> {
    constructor(injector: Injector, public accountService: AccountsService) {
        super(injector)
    }

    login(username: string, password: string) {
        return this.post('Authorization/login', { username, password }).pipe(
            map((result: any) => {
                if (!result.token) {
                    return false
                }

                localStorage.setItem('token', result.token)
                // const helper = new JwtHelperService();

                // const decodedToken = helper.decodeToken(result.token);
                // this.currentUserSubject.next(decodedToken); // <-- pump the value in here
                return true
            })
        )
    }

    logout() {
        localStorage.removeItem('token')
    }

    isAuthendicated() {
        const token = localStorage.getItem('token')
        if (!token) {
            return false
        }
        return true
    }

    register(): Observable<User> {
        const body = {
            accountId: this.accountService.registerForm.value.accountId,
            accountName: this.accountService.registerForm.value.accountName,
            primaryAdminFirstlName: this.accountService.registerForm.value
                .primaryAdminFirstlName,
            primaryAdminLastName: this.accountService.registerForm.value
                .primaryAdminLastName,
            primaryAdminEmail: this.accountService.registerForm.value
                .primaryAdminEmail,
            primaryAdminPassword: this.accountService.registerForm.value
                .primaryAdminPassword,
            accountMobile: this.accountService.registerForm.value.accountMobile,
            countryId: this.accountService.registerForm.value.countryId,
        }
        return this.post('Account', body)
    }

    updateProfile(model: User) {
        return this.put('Account', model)
    }
}
