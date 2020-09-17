import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, NavigationEnd } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
    forgetPassForm: FormGroup
    submitted = false
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private auth: AuthService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.forgetPassForm = this.formBuilder.group({
            email: [null, [Validators.required]],
        })
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
    }

    get f() {
        return this.forgetPassForm.controls
    }
    get email() {
        return this.forgetPassForm.get('email')
    }

    onSubmit() {
        this.submitted = true
        this.auth.forgetPassword(this.email.value).subscribe((result: any) => {
            if (result.isSucceeded) {
                this.toastr.success('Check your Email')
            } else {
                this.toastr.error(result.errors)
            }
        })
    }
}
