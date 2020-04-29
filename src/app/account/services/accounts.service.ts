import { Injectable } from '@angular/core'
import { User } from '../models/register'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

@Injectable({
    providedIn: 'root',
})
export class AccountsService {
    // readonly rootUrl = 'http://localhost:5001/api'
    constructor(private fb: FormBuilder) {}

    // registerUser(user: User) {
    //     const body: User = {
    //         accountName: user.accountName,
    //         primaryAdminFirstlName: user.primaryAdminFirstlName,
    //         primaryAdminLastName: user.primaryAdminLastName,
    //         primaryAdminEmail: user.primaryAdminEmail,
    //         primaryAdminPassword: user.primaryAdminPassword,
    //         accountMobile: user.accountMobile,
    //         countryId: user.countryId,
    //     }

    //     return this.http.post(this.rootUrl + '/Account', body)
    // }

    registerForm = this.fb.group({
        // accountId: [],
        primaryAdminFirstlName: [
            null,
            [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
        ],
        primaryAdminLastName: [
            null,
            [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
        ],
        primaryAdminEmail: [
            null,
            [
                Validators.required,
                Validators.email,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
            ],
        ],
        accountMobile: [
            null,
            [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
        ],
        Passwords: this.fb.group(
            {
                primaryAdminPassword: [
                    null,
                    [Validators.required, Validators.minLength(6)],
                ],
                confirmPassword: [null, [Validators.required]],
            },
            {
                validators: this.comparePassword,
            }
        ),
        company: [null, [Validators.required]],
        countryId: [null, Validators.required],
    })

    comparePassword(fb: FormGroup) {
        // tslint:disable-next-line:prefer-const
        let confirmPswrdCtrl = fb.get('confirmPassword')
        if (
            confirmPswrdCtrl.errors == null ||
            'passwordMismatch' in confirmPswrdCtrl.errors
        ) {
            if (
                fb.get('primaryAdminPassword').value !== confirmPswrdCtrl.value
            ) {
                confirmPswrdCtrl.setErrors({ passwordMismatch: true })
            } else {
                confirmPswrdCtrl.setErrors(null)
            }
        }
    }
}
