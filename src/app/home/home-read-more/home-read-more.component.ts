import { Component, OnInit, HostBinding } from '@angular/core'

@Component({
    selector: 'app-home-read-more',
    templateUrl: './home-read-more.component.html',
    styleUrls: ['./home-read-more.component.scss'],
})
export class HomeReadMoreComponent implements OnInit {
    egyptCarousel: any = {
        loop: false,
        mouseDrag: true,
        touchDrag: true,
        autoWidth: true,
        pullDrag: true,
        dots: true,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            740: {
                items: 2,
            },
            940: {
                items: 2,
            },
        },
        nav: true,
    }
    constructor() {}

    ngOnInit() {}
}
