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
        private auth: AuthService
    ) {}

    ngOnInit(): void {
        // this.editProfileForm = this.formBuilder.group(
        //     {
        //         firstname: [
        //             '',
        //             [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
        //         ],
        //         lastname: [
        //             '',
        //             [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
        //         ],
        //         email: [
        //             '',
        //             [
        //                 Validators.required,
        //                 Validators.email,
        //                 Validators.pattern(
        //                     '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
        //                 ),
        //             ],
        //         ],
        //         telephonenumber: [
        //             '',
        //             [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
        //         ],
        //         password: ['', [Validators.required, Validators.minLength(6)]],
        //         confirmPassword: ['', [Validators.required]],
        //         company: [
        //             '',
        //             [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
        //         ],
        //     },
        //     {
        //         validator: MustMatch('password', 'confirmPassword'),
        //     }
        // )

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
        this.auth.updateProfile(form.value).subscribe((result) => {
            if (result) {
                this.router.navigateByUrl('/owner')
                alert(
                    'Updated SUCCESSFULLY!! :-)\n\n' +
                        JSON.stringify(this.editProfileForm.value, null, 4)
                )
            } else {
                alert(
                    'Failed!! :-)\n\n' +
                        JSON.stringify(this.editProfileForm.value, null, 4)
                )
            }
        })
    }
}
