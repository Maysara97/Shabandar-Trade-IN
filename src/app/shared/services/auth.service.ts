import { LocalstorageService } from './LocalstorageService';
import { BaseService } from './../core/base.service'
import { Injectable, Injector } from '@angular/core'
import { map } from 'rxjs/operators'
import {
    User,
    Administrator,
    AccountData,
} from 'src/app/account/models/register'
import { AccountsService } from 'src/app/account/services/accounts.service'
import { Observable, BehaviorSubject } from 'rxjs'
import { JwtHelperService } from '@auth0/angular-jwt'
import { tokenGetter } from 'src/app/app.module'
import { UpdatePassword } from 'src/app/account/models/updatePassword'
import { Category } from 'src/app/application/models/category'

@Injectable({
    providedIn: 'root',
})
export class AuthService extends BaseService<any> {
    private currentUserSubject = new BehaviorSubject<any>(this.decodeToken())
    public currentUser = this.currentUserSubject.asObservable()

    private isAuthSubject = new BehaviorSubject<boolean>(this.hasToken())
    public isAuthed = this.isAuthSubject.asObservable()

    constructor(injector: Injector, private jwtService: JwtHelperService , private myStorage: LocalstorageService) {
        super(injector)
    }

    login(email: string, password: string) {
        return this.post('Authorization/login', { email, password }).pipe(
            map((result: any) => {
                if (!result.isSucceeded) {
                    return result
                }

                this.myStorage.setItem('token', result.data)
                const currentUser = this.decodeToken(result.data)
                this.currentUserSubject.next(currentUser) // <-- pump the value in here
                this.isAuthSubject.next(true)
                return result
            })
        )
    }

    isLoggedIn() {
        return this.isAuthSubject.value
    }

    private decodeToken(token?: any) {
        token = token ? token : this.myStorage.getItem('token')
        const helper = new JwtHelperService()
        return helper.decodeToken(token)
    }

    private hasToken() {
        return !!this.myStorage.getItem('token')
    }

    logout() {
        this.isAuthSubject.next(false)
        this.myStorage.removeItem('token')
        this.myStorage.clear()
    }

    register(user: User): Observable<User> {
        const body = {
            accountName: user.accountName,
            primaryAdminFirstlName: user.primaryAdminFirstlName,
            primaryAdminLastName: user.primaryAdminLastName,
            primaryAdminEmail: user.primaryAdminEmail,
            primaryAdminPassword: user.primaryAdminPassword,
            countryId: user.countryId,
            categoryId: user.categoryId,
            acceptTerms: user.acceptTerms,
        }
        return this.post('Account', body)
    }

    updateProfile(
        account: AccountData,
        mobileResults,
        phoneResults,
        categoriesResult,
        images
    ): Observable<AccountData> {
        const body = {
            accountImage: images,
            accountName: account.accountName,
            mission: account.mission,
            vission: account.vission,
            whatsApp: account.whatsApp,
            weChat: account.weChat,
            address: account.address,
            mobile: mobileResults,
            phone: phoneResults,
            zipCode: account.zipCode,
            description: account.description,
            accountAttachments: account.accountAttachments,
            accountWebsite: account.accountWebsite,
            countryId: account.countryId,
            categories: categoriesResult,
            categoryId: account.categoryId,
        }
        return this.put('Account', body)
    }

    updatePassword(body): Observable<any> {
        return this.post('Authorization/ChangePassword', body)
    }

    getAccountDetails(): Observable<AccountData> {
        return this.get('Account/GetMyAccount')
    }

    getTargetUserProfile(TargetAccountId: string) {
        return this.getById('Account', TargetAccountId)
    }

    confirmEmail(email: string, token: string) {
        return this.post('Authorization/ConfirmEmail', { email, token })
    }
    getAccountsByCategoryId(categoryId: string) {
        return this.getById('Account/GetAccountsByCategory', categoryId)
    }
    forgetPassword(email: string) {
        return this.getById('Authorization/ForgetPassword', email)
    }
    getAccountCategories(): Observable<Category> {
        return this.get('Account/AccountCategoriesLookUp')
    }
    getAccountsBySubCategoryId(subCategoryId: string) {
        return this.getById('Account/GetAccountsBySubCategory', subCategoryId)
    }
    getAllSearchData(
        pageSize: number,
        pageNumber: number,
        searchKeyWord: string
    ){
    return this.getAll(`Account/GeneralSearch/${pageSize}/${pageNumber}?keyWord=${searchKeyWord}`)
  }
}
