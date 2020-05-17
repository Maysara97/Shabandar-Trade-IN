import { Injectable } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { MustMatch } from '../models/matchPassword'
import { UpdatePassword } from '../models/updatePassword'

@Injectable({
    providedIn: 'root',
})
export class UpdatePasswordService {
    userPassword: UpdatePassword
    constructor(private fb: FormBuilder) {}
    updatePasswordForm = this.fb.group(
        {
            currentPassword: [],
            newPassword: [
                null,
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.pattern(
                        '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})'
                    ),
                ],
            ],
            confirmNewPassword: [null, [Validators.required]],
        },
        {
            validators: MustMatch('newPassword', 'confirmNewPassword'),
        }
    )

    comparePassword(fb: FormGroup) {
        // tslint:disable-next-line:prefer-const
        let confirmPswrdCtrl = fb.get('confirmNewPassword')
        if (
            confirmPswrdCtrl.errors == null ||
            'passwordMismatch' in confirmPswrdCtrl.errors
        ) {
            if (fb.get('newPassword').value !== confirmPswrdCtrl.value) {
                confirmPswrdCtrl.setErrors({ passwordMismatch: true })
            } else {
                confirmPswrdCtrl.setErrors(null)
            }
        }
    }
}
