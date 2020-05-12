import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { User } from 'src/app/account/models/register'
import { Role } from 'src/app/account/models/role'

@Component({
    selector: 'app-home-header',
    templateUrl: './home-header.component.html',
    styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent implements OnInit {
    isLoggedIn
    currentUser: User
    // tslint:disable-next-line:variable-name
    constructor(public _route: Router, private auth: AuthService) {}

    ngOnInit(): void {
        this.auth.isAuthed.subscribe((result) => {
            this.isLoggedIn = result
        })
    }

    hideNav() {
        const x = document.getElementById('mainNav')
        if (x.style.display === 'none') {
            x.style.display = 'block'
        } else {
            x.style.display = 'none'
        }
    }

    public navigateToSection(section: string) {
        window.location.hash = ''
        window.location.hash = section
    }

    openProfile() {
        // // Here Check if admin or Regular User
        // if (this.currentUser.role === Role.User) {
        //     this._route.navigateByUrl('/account/owner')
        // } else if (this.currentUser.role === Role.Admin) {
        //     // this._route.navigateByUrl('/admin-panel/dashboard')
        // }

        this._route.navigateByUrl('/account/owner')
    }

    logout() {
        this.auth.logout()
        // this._route.navigateByUrl('login')
    }
}
