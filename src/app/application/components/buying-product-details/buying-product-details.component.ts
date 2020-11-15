import { Component, OnInit, TemplateRef } from '@angular/core'
import { BuyingRequest } from '../../models/buying-request'
import { BuyingRequestService } from '../../services/buying-request.service'
import { ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment'
import { FinishedStatusTypeMapping } from '../../models/enum'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { AccountData } from 'src/app/account/models/register'
import { AuthService } from 'src/app/shared/services/auth.service'


@Component({
    selector: 'app-buying-product-details',
    templateUrl: './buying-product-details.component.html',
    styleUrls: ['./buying-product-details.component.scss'],
})
export class BuyingProductDetailsComponent implements OnInit {
    buyingRequestDetails: BuyingRequest
    viewImageModal: BsModalRef

    buyingRequestId
    env: any
    myAccount:AccountData
    accountId
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
                items: 1,
            },
            740: {
                items: 1,
            },
            940: {
                items: 1,
            },
        },
        nav: false,
    }
    constructor(
        private buyingRequestService: BuyingRequestService,
        private route: ActivatedRoute,
        private modalService: BsModalService,
        private auth: AuthService
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
            
            this.auth.getAccountDetails()
            .subscribe((result: any) => {
                this.myAccount = result.data
                //accountId
                this.accountId=this.myAccount.accountId
            })
  
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }

    viewImage(template: TemplateRef<any>) {
        this.viewImageModal = this.modalService.show(template, {
            class: 'modal-lg',
        })
    }
    closeSubDialog(): void {
        this.viewImageModal.hide()
    }
}
