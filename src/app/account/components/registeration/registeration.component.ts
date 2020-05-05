import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms'
import { MustMatch } from '../../models/matchPassword'
import { AccountsService } from '../../services/accounts.service'
import { User } from '../../models/register'
import { Router, NavigationEnd } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ToastrService } from 'ngx-toastr'

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
        public accountService: AccountsService,
        private router: Router,
        private auth: AuthService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
    }
    get f() {
        return this.accountService.registerForm.controls
    }

    onSubmit(user) {
        this.submitted = true
        this.auth.register(user).subscribe((result: any) => {
            if (result) {
                this.router.navigate(['/account/login'])
            } else {
                this.toastr.error('Error')
            }
        })
    }
}
