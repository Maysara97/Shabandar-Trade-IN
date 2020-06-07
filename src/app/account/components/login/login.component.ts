import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms'
import { Router, NavigationEnd } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { User } from '../../models/register'
import { ToastrService } from 'ngx-toastr'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup
    submitted = false
    userId
    userData: User
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private auth: AuthService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            primaryAdminEmail: [null, [Validators.required]],
            primaryAdminPassword: [null, [Validators.required]],
        })

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
    }

    get f() {
        return this.loginForm.controls
    }

    get email() {
        return this.loginForm.get('primaryAdminEmail')
    }
    get password() {
        return this.loginForm.get('primaryAdminPassword')
    }

    onSubmit() {
        this.submitted = true
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return
        }
        this.auth
            .login(this.email.value, this.password.value)
            .subscribe((result: any) => {
                if (result.isSucceeded) {
                    // this.toastr.success('Success')
                    this.router.navigate(['/account/owner'])
                } else {
                    this.loginForm.reset()
                    this.toastr.error('Invalid login credentials')
                }
            })
    }
}
