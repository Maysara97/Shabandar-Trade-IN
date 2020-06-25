import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { AccountData } from 'src/app/account/models/register'
import { environment } from 'src/environments/environment'
import { AccountProductService } from '../../services/accountProduct.service'
import { AccountProduct } from '../../models/accountProduct'
import { BuyingRequest } from '../../models/buying-request'
import { BuyingRequestService } from '../../services/buying-request.service'

@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
    TargetAccountId
    targetAccountDetails: AccountData
    accountProducts: AccountProduct[]
    buyingProducts: BuyingRequest[]
    env: any
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
        private authService: AuthService,
        private route: ActivatedRoute,
        private accountProductService: AccountProductService,
        private buyingRequestService: BuyingRequestService
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
            .getAccountProductsByOwner()
            .subscribe((result: any) => {
                this.accountProducts = result.data
            })

        this.buyingRequestService
            .getBuyingRequestsByOwner()
            .subscribe((result: any) => {
                this.buyingProducts = result.data
            })
    }
    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
