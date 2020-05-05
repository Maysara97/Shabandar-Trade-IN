import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
    selector: 'app-home-header',
    templateUrl: './home-header.component.html',
    styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent implements OnInit {
    isLoggedIn
    // tslint:disable-next-line:variable-name
    constructor(public _route: Router, private auth: AuthService) {}

    ngOnInit(): void {
        // this.isLoggedIn = this.auth.isLoggedIn()
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

    logout() {
        this.auth.logout()
        // this._route.navigateByUrl('login')
    }

    // isUserRegistered() {
    //     const email = !!localStorage.getItem('email')
    //     if (email) {
    //         return true
    //     }
    //     return false
    // }
    // isLoggedIn() {
    //     if (localStorage.getItem('currentUser')) {
    //         return true
    //     }
    //     return false
    // }
}
