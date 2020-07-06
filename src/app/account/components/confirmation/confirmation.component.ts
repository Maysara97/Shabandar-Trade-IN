import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { map, tap } from 'rxjs/operators'
import { Administrator } from '../../models/register'

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
    email
    token
    newUserDetails: Administrator
    emailConfirmed
    constructor(private auth: AuthService,
        private activatedRoute: ActivatedRoute, private router: Router) {

            this.email = activatedRoute.snapshot.params['email']
            this.token = activatedRoute.snapshot.params['token']
        }

    ngOnInit(): void {
        
        this.activatedRoute.queryParamMap
            .pipe(
                map(queryParams => ({
                    token: queryParams.get('token'),
                    email: queryParams.get('email'),
                })),
                tap(data => {
                    this.auth.confirmEmail(data.email,data.token).subscribe((result: any) => {
                        debugger
                        result.data
                        if(result.isSucceeded)
                        {
                            this.router.navigate(['/application/confirmation-successfull'])
                        }
                        else
                        {
                            this.router.navigate(['/application/confirmation-failed'])
                        }
                    })
                })
            )
            .subscribe(result => {})

    }
}
