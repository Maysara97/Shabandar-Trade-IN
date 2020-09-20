import { Component, OnInit, TemplateRef } from '@angular/core'
import { User, AccountData, Favorites } from 'src/app/account/models/register'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { Product } from '../../models/product'
import { AccountProductService } from '../../services/accountProduct.service'
import { BuyingRequestService } from '../../services/buying-request.service'
import { AccountProduct } from '../../models/accountProduct'
import { BuyingRequest } from '../../models/buying-request'
import { environment } from 'src/environments/environment'
import { Notifications } from 'src/app/notifications/models/notification'
import { StatusMapping } from '../../models/enum'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

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
    fillAccountDataModal: BsModalRef
    public ProductStatusMapping = StatusMapping

    productSlider: any = {
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
                items: 1,
            },
            940: {
                items: 3,
            },
        },
        nav: true,
    }

    requestsSlider: any = {
        loop: false,
        mouseDrag: true,
        // center: true,
        touchDrag: true,
        autoWidth: true,
        pullDrag: true,
        // rewind: true,
        dots: true,
        navSpeed: 700,
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
        nav: false,
    }
    interestsOptions: any = {
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

    carouselOptions: any = {
        margin: 0,
        loop: true,
        center: true,
        nav: true,
        rewind: true,
        navSpeed: 700,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        autoplaySpeed: 5000,
        navText: [
            // tslint:disable-next-line:quotemark
            "<div class='nav-btn prev-slide'></div>",
            // tslint:disable-next-line:quotemark
            "<div class='nav-btn next-slide'></div>",
        ],

        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            600: {
                items: 1,
                nav: true,
            },
            1000: {
                items: 3,
                nav: true,
            },
            1500: {
                items: 4,
                nav: true,
            },
        },
    }

    pageSize = 1
    pageNumber = 1
    notifications: Notifications[]

    constructor(
        private router: Router,
        private auth: AuthService,
        private route: ActivatedRoute,
        private accountProductService: AccountProductService,
        private buyingRequestService: BuyingRequestService,
        private modalService: BsModalService
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

    deleteBuyingRequest(BuyingRequest: string) {
        this.buyingRequestService
            .deleteBuyingRequest(BuyingRequest)
            .subscribe((res) => this.getAllBuyingRequests())
    }

    goToWebsiteUrl(url) {
        const path = 'http://' + url
        window.open(path, '_blank')
    }

    fillAccountData(template: TemplateRef<any>) {
        this.fillAccountDataModal = this.modalService.show(template, {
            class: 'modal-md',
        })
    }
}
