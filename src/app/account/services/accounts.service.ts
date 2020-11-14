import { Injectable } from '@angular/core'
import { User } from '../models/register'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { MustMatch } from '../models/matchPassword'
import { AuthService } from 'src/app/shared/services/auth.service'

@Injectable({
    providedIn: 'root',
})
export class AccountsService {
    constructor(private fb: FormBuilder) {}
    registerForm = this.fb.group(
        {
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
                    Validators.pattern(
                        '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
                    ),
                ],
            ],
            // accountMobile: [null, [Validators.required]],
            primaryAdminPassword: [
                null,
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.pattern(
                        '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})'
                    ),
                ],
            ],
            confirmPassword: [null, [Validators.required]],

            accountName: [null, [Validators.required]],
            countryId:[null, [Validators.required]],
            categoryId:[null, [Validators.required]],
            acceptTerms: [false, Validators.required],
        },
        {
            validators: MustMatch('primaryAdminPassword', 'confirmPassword'),
        }
    )

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
