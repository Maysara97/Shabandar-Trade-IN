import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
    email
    token
    constructor(private auth: AuthService) {}

    ngOnInit(): void {
        this.auth
            .confirmEmail(this.email, this.token)
            .subscribe((result: any) => {
                if (result.isSucceeded) {
                    console.log(this.email + this.token)
                } else {
                    console.log(result.errors)
                }
            })
    }
}
