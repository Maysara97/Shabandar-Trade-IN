import { ToastrService } from 'ngx-toastr'
import { Component, OnInit } from '@angular/core'
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NavigationEnd, Router } from '@angular/router'
import { User } from '../../models/register'
import { AccountsService } from '../../services/accounts.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { MustMatch } from '../../models/matchPassword'

@Component({
    selector: 'app-editprofile',
    templateUrl: './editprofile.component.html',
    styleUrls: ['./editprofile.component.scss'],
})
export class EditprofileComponent implements OnInit {
    editProfileForm: FormGroup
    submitted = false
    data = false
    message: string
    profileData: User

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountsService,
        private router: Router,
        private auth: AuthService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.profileData = this.auth.accountInfo
        this.editProfileForm = this.formBuilder.group({
            firstname: [
                this.profileData.primaryAdminFirstlName,
                [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
            ],
            lastname: [
                this.profileData.primaryAdminLastName,
                [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
            ],

            telephonenumber: [
                this.profileData.accountMobile,
                [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
            ],
            company: [
                this.profileData.accountName,
                [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
            ],
        })

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
    }
    get f() {
        return this.editProfileForm.controls
    }

    onSubmit(form: NgForm) {
        this.submitted = true
        this.auth.updateProfile(form.value).subscribe((result: any) => {
            if (result) {
                this.router.navigate(['/account/owner'])
            } else {
                this.toastr.error('Error')
            }
        })
    }
}
