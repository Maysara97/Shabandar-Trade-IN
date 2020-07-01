import { Component, OnInit, HostBinding } from '@angular/core'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
    isLoggedIn
    myBackgroundImageUrl = './assets/images/You-Trade-In/Header.png'
    constructor(private auth: AuthService) {}

    ngOnInit() {
        this.auth.isAuthed.subscribe((result) => {
            this.isLoggedIn = result
        })
    }
    @HostBinding('style.backgroundImage')
    getBackgroundImageUrl() {
        return `url(${this.myBackgroundImageUrl})`
    }
}
