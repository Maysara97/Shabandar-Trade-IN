import { Component, OnInit } from '@angular/core'
import { BuyingRequest } from '../../models/buying-request'
import { BuyingRequestService } from '../../services/buying-request.service'
import { ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment'
import { FinishedStatusTypeMapping } from '../../models/enum'

@Component({
    selector: 'app-buying-product-details',
    templateUrl: './buying-product-details.component.html',
    styleUrls: ['./buying-product-details.component.scss'],
})
export class BuyingProductDetailsComponent implements OnInit {
    buyingRequestDetails: BuyingRequest

    buyingRequestId
    env: any
    public FinishedStatusTypeMapping = FinishedStatusTypeMapping
    imagesSlider: any = {
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
        private buyingRequestService: BuyingRequestService,
        private route: ActivatedRoute
    ) {
        this.buyingRequestId = route.snapshot.params['buyingRequestId']
        this.env = environment
    }

    ngOnInit(): void {
        this.buyingRequestService
            .getBuyingRequestById(this.buyingRequestId)
            .subscribe((result: any) => {
                this.buyingRequestDetails = result.data
            })
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
