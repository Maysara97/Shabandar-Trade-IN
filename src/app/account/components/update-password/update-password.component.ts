import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UpdatePasswordService } from '../../services/update-password.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
    submitted = false
    constructor(
        public updatePassService: UpdatePasswordService,
        private auth: AuthService,
        private route: Router
    ) {}

    ngOnInit(): void {}
    get f() {
        return this.updatePassService.updatePasswordForm.controls
    }
    onSubmit(form) {
        this.auth
            .updatePassword(this.updatePassService.updatePasswordForm.value)
            .subscribe((data) => {
                this.route.navigateByUrl('/account/owner')
            })
    }
}
