import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/account/models/register'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-owner',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit {
    user: User
    loggedUser$: Observable<User>
    loggedUser: User
    constructor() {}

    ngOnInit(): void {}
}
