import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms'
import { MustMatch } from '../../models/matchPassword'
import { AccountsService } from '../../services/accounts.service'
import { User } from '../../models/register'
import { Router, NavigationEnd } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
    selector: 'app-registeration',
    templateUrl: './registeration.component.html',
    styleUrls: ['./registeration.component.scss'],
})
export class RegisterationComponent implements OnInit {
    registerForm: FormGroup
    submitted = false
    data = false
    message: string
    userData: User
    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountsService,
        private router: Router,
        private auth: AuthService
    ) {}

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group(
            {
                firstname: [
                    '',
                    [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
                ],
                lastname: [
                    '',
                    [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
                ],
                email: [
                    '',
                    [
                        Validators.required,
                        Validators.email,
                        Validators.pattern(
                            '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
                        ),
                    ],
                ],
                telephonenumber: [
                    '',
                    [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
                ],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]],
                company: [
                    '',
                    [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
                ],
            },
            {
                validator: MustMatch('password', 'confirmPassword'),
            }
        )

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
    }
    get f() {
        return this.registerForm.controls
    }

    onSubmit(form: NgForm) {
        this.auth.register(form.value).subscribe(
            (result) => {
                if (result) {
                    this.router.navigateByUrl('/home')
                    alert(
                        'SUCCESS!! :-)\n\n' +
                            JSON.stringify(this.registerForm.value, null, 4)
                    )
                } else {
                    alert(
                        'Failed!! :-)\n\n' +
                            JSON.stringify(this.registerForm.value, null, 4)
                    )
                }
            },
            (error) =>
                alert(
                    'Error!! :-)\n\n' +
                        JSON.stringify(this.registerForm.value, null, 4)
                )
        )
    }
}
