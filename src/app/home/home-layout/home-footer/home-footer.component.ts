import { Component, OnInit, HostBinding } from '@angular/core'

@Component({
    selector: 'app-home-footer',
    templateUrl: './home-footer.component.html',
    styleUrls: ['./home-footer.component.scss'],
})
export class HomeFooterComponent implements OnInit {
    myBackgroundImageUrl = 'assets/images/You-Trade-In/background.png'
    constructor() {}

    ngOnInit() {}
    @HostBinding('style.backgroundImage')
    getBackgroundImageUrl() {
        return `url(${this.myBackgroundImageUrl})`
    }

    public navigateToSection(section: string) {
        window.location.hash = ''
        window.location.hash = section
    }
}
