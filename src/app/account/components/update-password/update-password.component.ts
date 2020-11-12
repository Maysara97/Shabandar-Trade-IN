import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UpdatePasswordService } from '../../services/update-password.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { User } from '../../models/register'
import { AccountsService } from '../../services/accounts.service'

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
    submitted = false
    userPass: User
    fieldTextType: boolean
    constructor(
        public updatePassService: UpdatePasswordService,
        public auth: AuthService,
        private route: Router,
        private toastr: ToastrService,
        public accountService: AccountsService
    ) {}

    ngOnInit(): void {}
    get f() {
        return this.updatePassService.updatePasswordForm.controls
    }

    onSubmit(form) {
        this.auth.updatePassword(form).subscribe((data) => {
            if (data) {
                this.route.navigateByUrl('/account/owner')
                 this.toastr.success("Your password updated Successfully")
            } else {
                this.updatePassService.updatePasswordForm.reset()
                this.toastr.error('Invalid resetting Password')
            }
        })
    }


       toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType
    }
}
