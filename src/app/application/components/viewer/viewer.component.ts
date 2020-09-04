import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { AccountData } from 'src/app/account/models/register'
import { environment } from 'src/environments/environment'
import { AccountProductService } from '../../services/accountProduct.service'
import { AccountProduct } from '../../models/accountProduct'
import { BuyingRequest } from '../../models/buying-request'
import { BuyingRequestService } from '../../services/buying-request.service'
import { FavoriteService } from '../../services/favorite.service'
import { Favorite } from '../../models/favorite'

@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
    TargetAccountId
    accountProductID
    targetAccountDetails: AccountData
    accountProducts: AccountProduct[]
    buyingProducts: BuyingRequest[]
    env: any
    favoriteId
    isFavorite
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
    constructor(
        private router: Router,
        private authService: AuthService,
        private route: ActivatedRoute,
        private accountProductService: AccountProductService,
        private buyingRequestService: BuyingRequestService,
        private isFavoriteService: FavoriteService
    ) {
        this.TargetAccountId = route.snapshot.params['TargetAccountId']
        this.env = environment
    }

    ngOnInit(): void {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })

        this.authService
            .getTargetUserProfile(this.TargetAccountId)
            .subscribe((result: any) => {
                this.targetAccountDetails = result.data
            })

        this.accountProductService
            .getAccountProductByOwnerID(this.TargetAccountId)
            .subscribe((result: any) => {
                this.accountProducts = result.data
            })

        this.buyingRequestService
            .getBuyingRequestsByOwnerID(this.TargetAccountId)
            .subscribe((result: any) => {
                this.buyingProducts = result.data
            })
    }
    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }

    addFavorite(TargetAccountId) {
        const favorite: Favorite = {
            favoriteItemId: TargetAccountId,
        }
        // this.targetAccountDetails.isFavorite = this.isFavorite
        this.isFavoriteService
            .createFavorite(favorite)
            .subscribe((result: any) => {
                if (result.isSucceeded) {
                    this.targetAccountDetails.isFavorite = true
                    this.targetAccountDetails.favoriteId = result.data
                }
            })
    }

    deleteFavorite(favoriteId) {
        this.isFavoriteService
            .deleteFavorite(favoriteId)
            .subscribe((result: any) => {
                if (result.isSucceeded) {
                    this.targetAccountDetails.isFavorite = false
                }
            })
    }

    goToWebsiteUrl(url) {
        const path = 'http://' + url
        window.open(path, '_blank')
    }
}
