import { Component, OnInit, HostBinding } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home-footer',
    templateUrl: './home-footer.component.html',
    styleUrls: ['./home-footer.component.scss'],
})
export class HomeFooterComponent implements OnInit {
    private fragment: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {

        this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    }


    // tslint:disable-next-line: use-lifecycle-interface
    // ngAfterViewInit(): void {
    //     try {
    //       document.querySelector('#' + this.fragment).scrollIntoView();
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }


    public navigateToSection(section) {
        window.location.hash = ''
        window.location.hash = section
    }
}
