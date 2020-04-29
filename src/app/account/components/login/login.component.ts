import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, NavigationEnd } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { User } from '../../models/register'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup
    submitted = false
    userData: User
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private auth: AuthService
    ) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: [null, [Validators.required]],
            password: [null, [Validators.required]],
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

    get username() {
        return (
            this.userData.primaryAdminFirstlName +
            '' +
            this.userData.primaryAdminLastName
        )
    }

    onSubmit() {
        this.submitted = true

        const loginData = this.loginForm.value
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return
        }

        this.auth.login(loginData.email, loginData.password).subscribe(
            (result) => {
                if (result) {
                    this.router.navigate(['/home/owner'])
                    alert(
                        'SUCCESS!! :-)\n\n' +
                            JSON.stringify(this.loginForm.value, null, 4)
                    )
                } else {
                    alert(
                        'Failed!! :-)\n\n' +
                            JSON.stringify(this.loginForm.value, null, 4)
                    )
                }
            }
            // (error) => this.router.navigate(['/home/owner'])
        )
        // display form values on success
    }
}
