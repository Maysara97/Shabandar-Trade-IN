import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms'
import { MustMatch } from '../../models/matchPassword'
import { AccountsService } from '../../services/accounts.service'
import { User } from '../../models/register'
import { Router, NavigationEnd } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ToastrService } from 'ngx-toastr'
import { CountryService } from 'src/app/application/services/country.service'
import { Country } from 'src/app/application/models/country'

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
    countries: Country[]
    constructor(
        private formBuilder: FormBuilder,
        public accountService: AccountsService,
        private router: Router,
        private auth: AuthService,
        private toastr: ToastrService,
        private countryService: CountryService
    ) {}

    ngOnInit(): void {
        // Bind all Countries
        this.countryService.getAllCountries().subscribe((result: any) => {
            this.countries = result.data
        })
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
            if (result.isSucceeded) {
                this.router.navigate(['/account/login'])
            } else {
                this.toastr.error(result.errors)
            }
        })
    }
}
