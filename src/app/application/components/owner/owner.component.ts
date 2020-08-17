import { Component, OnInit, ViewChild } from '@angular/core'
import {
    User,
    Administrator,
    AccountData,
    Favorites,
} from 'src/app/account/models/register'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { Product } from '../../models/product'
import { ProductService } from '../../services/product.service'
import { AccountProductService } from '../../services/accountProduct.service'
import { BuyingRequestService } from '../../services/buying-request.service'
import { AccountProduct } from '../../models/accountProduct'
import { BuyingRequest } from '../../models/buying-request'
import { environment } from 'src/environments/environment'
import { MatMenuTrigger } from '@angular/material/menu'

@Component({
    selector: 'app-owner',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit {
    user: User

    userDetails: AccountData
    favorites: Favorites[]
    accountProducts: AccountProduct[]
    buyingProducts: BuyingRequest[]
    env: any
    product: Product[] = []
    productSlider: any = {
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
                items: 4,
            },
        },
        nav: true,
    }
    requestsSlider: any = {
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
                items: 4,
            },
        },
        nav: true,
    }

    constructor(
        private router: Router,
        private auth: AuthService,
        private route: ActivatedRoute,
        private accountProductService: AccountProductService,
        private buyingRequestService: BuyingRequestService
    ) {
        this.env = environment
    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })

        this.auth.getAccountDetails().subscribe((result: any) => {
            this.userDetails = result.data
        })
        this.getAllAccountProduct()

        this.getAllBuyingRequests()
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }

    goToProductDetails(accountProductId: string) {
        this.router.navigateByUrl(
            `/application/product-details/${accountProductId}`
        )
    }

    getAllAccountProduct() {
        this.accountProductService
            .getAccountProductsByOwner()
            .subscribe((result: any) => {
                this.accountProducts = result.data
            })
    }
    getAllBuyingRequests() {
        this.buyingRequestService
            .getBuyingRequestsByOwner()
            .subscribe((result: any) => {
                this.buyingProducts = result.data
            })
    }
    deleteAccountProduct(AccountProductId: string) {
        this.accountProductService
            .deleteAccountProduct(AccountProductId)
            .subscribe((res) => this.getAllAccountProduct())
    }

    // editAccountProduct(AccountProductId: AccountProduct) {

    // }

    deleteBuyingRequest(BuyingRequest: string) {
        this.buyingRequestService
            .deleteBuyingRequest(BuyingRequest)
            .subscribe((res) => this.getAllBuyingRequests())
    }

    goToWebsiteUrl(url) {
        const path = 'http://' + url
        window.open(path, '_blank')
    }
}
