import { Component, OnInit, HostBinding } from '@angular/core'

@Component({
    selector: 'app-home-footer',
    templateUrl: './home-footer.component.html',
    styleUrls: ['./home-footer.component.scss'],
})
export class HomeFooterComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    public navigateToSection(section: string) {
        window.location.hash = ''
        window.location.hash = section
    }
}
