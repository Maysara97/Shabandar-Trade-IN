import { Component, OnInit } from '@angular/core'
import { User, Administrator } from 'src/app/account/models/register'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { Product } from '../../models/product'
import { ProductService } from '../../services/product.service'
@Component({
    selector: 'app-owner',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit {
    user: User
    userAdministrator: Administrator
    loggedUser$: Observable<User>
    isLoggedIn

    product: Product[] = []
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
                items: 3,
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
    constructor(
        private router: Router,
        private auth: AuthService,
        private route: ActivatedRoute,
        private productService: ProductService
    ) {}

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
        this.userAdministrator = this.auth.accountAdminastratorInfo
        this.user = this.auth.accountInfo
    }

    // getProductsByOwner() {
    //     this.product$ = this.productService.getProductsByOwner()
    // }
}

// updateProfile(userId: number) {
//     this.router.navigate(['/owner/editProfile', userId])
// }
