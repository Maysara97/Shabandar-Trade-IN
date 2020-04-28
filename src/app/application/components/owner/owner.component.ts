import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/account/models/register'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
@Component({
    selector: 'app-owner',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit {
    user: User
    loggedUser$: Observable<User>

    title = 'angularowlslider'
    customOptions: any = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: false,
        navSpeed: 700,
        navText: ['Prev', 'Next'],
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 2,
            },
            740: {
                items: 3,
            },
            940: {
                items: 4,
            },
        },
        nav: true,
    }

    interestsOptions: any = {
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: false,
        navSpeed: 700,
        navText: ['Prev', 'Next'],
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 2,
            },
            740: {
                items: 2,
            },
            940: {
                items: 3,
            },
        },
        nav: true,
    }
    constructor(private router: Router) {}

    ngOnInit() {}
}

// updateProfile(userId: number) {
//     this.router.navigate(['/owner/editProfile', userId])
// }
