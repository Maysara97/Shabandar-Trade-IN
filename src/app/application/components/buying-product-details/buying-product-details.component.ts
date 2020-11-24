import { Component, OnInit, TemplateRef } from '@angular/core'
import { BuyingRequest } from '../../models/buying-request'
import { BuyingRequestService } from '../../services/buying-request.service'
import { ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment'
import { FinishedStatusTypeMapping } from '../../models/enum'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { AccountData } from 'src/app/account/models/register'
import { AuthService } from 'src/app/shared/services/auth.service'

import { Meta , Title } from '@angular/platform-browser'
// import { ConsoleReporter } from 'jasmine'

@Component({
    selector: 'app-buying-product-details',
    templateUrl: './buying-product-details.component.html',
    styleUrls: ['./buying-product-details.component.scss'],
})
export class BuyingProductDetailsComponent implements OnInit {
    buyingRequestDetails: BuyingRequest
    viewImageModal: BsModalRef

    postUrl   =   encodeURI(document.location.href); // This Will Return This Product URL
    // Facebook Share URL For This Product
    facebookPost = `https://www.facebook.com/sharer/sharer.php?u=${this.postUrl}`;
    whatsappPost; // This Link Will Send All Product Details By Whatsapp
    twitterPost; // This Link Will Send All Product Details By Twitter
    imgUrl: string;

    buyingRequestId
    env: any
    myAccount: AccountData
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
        private auth: AuthService,
        private meta: Meta,
        private title: Title
    ) {
        this.buyingRequestId = route.snapshot.params['buyingRequestId']
        this.env = environment
    }

    ngOnInit(): void {
        this.buyingRequestService
            .getBuyingRequestById(this.buyingRequestId)
            .subscribe((result: any) => {
                this.buyingRequestDetails = result.data
                this.whatsappPost =  `https://api.whatsapp.com/send?text=${'\n' +encodeURI(this.buyingRequestDetails.title + '\n' + this.buyingRequestDetails.description) + '\n' }  ${this.postUrl}`;
                this.twitterPost =  `https://twitter.com/share?url=${this.postUrl}&text=${'\n' +encodeURI(this.buyingRequestDetails.title + '\n' + this.buyingRequestDetails.description + '\n' )}`;
                this.imgUrl = this.getFilePath(this.buyingRequestDetails.image[0]);

                // Add Meta Tags Specific For This Html Page Only.
                this.title.setTitle(this.buyingRequestDetails.title);
                this.meta.addTags([
                    { name: 'keywords', content: '' },
                    { name: 'Title', content: this.buyingRequestDetails.title },
                    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                    { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },

                  ]);

                this.meta.updateTag({name:'og_image', property:'og:image', Content:this.imgUrl})
                this.meta.updateTag({name:'og_description', property:'og:description', content:this.buyingRequestDetails.description})
                this.meta.updateTag({name:'description', content:this.buyingRequestDetails.description})
                this.meta.updateTag({name:'og_url' , property:'og:url' , content:this.postUrl})
                this.meta.updateTag({name:'og_title', property:'og:title', content:this.buyingRequestDetails.title})
            })

        this.auth.getAccountDetails()
            .subscribe((result: any) => {
                this.myAccount = result.data
                // accountId
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
