import { Component, OnInit, TemplateRef } from '@angular/core'
import { AccountProductService } from '../../services/accountProduct.service'
import { AccountProduct } from '../../models/accountProduct'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Meta , Title } from '@angular/platform-browser';

import {
    FinishedStatusType,
    FinishedStatusTypeMapping,
} from '../../models/enum'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { AccountData } from 'src/app/account/models/register'
import { AuthService } from 'src/app/shared/services/auth.service'


@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})


export class ProductDetailsComponent implements OnInit {
    accountProductDetails: AccountProduct
    accountProductId
    env: any
    viewImageModal: BsModalRef
    myAccount: AccountData
    accountId

    public FinishedStatusTypeMapping = FinishedStatusTypeMapping
    postUrl   =   encodeURI(document.location.href); // This Will Return This Product URL
    // Facebook Share URL For This Product
    facebookPost = `https://www.facebook.com/sharer/sharer.php?u=${this.postUrl}`;
    whatsappPost; // This Link Will Send All Product Details By Whatsapp
    twitterPost; // This Link Will Send All Product Details By Twitter
    imgUrl: string
    constructor(
        private accountProductService: AccountProductService,
        private route: ActivatedRoute,
        private modalService: BsModalService,
        private auth: AuthService,
        private meta: Meta,
        private title: Title
    ) {
        this.accountProductId = route.snapshot.params['accountProductId']
        this.env = environment
    }

    ngOnInit(): void {
        this.accountProductService
            .getAccountProductById(this.accountProductId)
            .subscribe((result: any) => {
                // debugger
                this.accountProductDetails = result.data
                // Tags and Share
                this.whatsappPost =  `https://api.whatsapp.com/send?text=${'\n' +encodeURI(this.accountProductDetails.productName + '\n' + this.accountProductDetails.description + '\n')} ${this.postUrl}`;
                this.twitterPost =  `https://twitter.com/share?url=${this.postUrl}&text=${'\n' +encodeURI(this.accountProductDetails.productName + '\n' + this.accountProductDetails.description + '\n' )}`;
                this.imgUrl = this.getFilePath(this.accountProductDetails.productImages[0]);

                this.title.setTitle(this.accountProductDetails.productName)
                this.meta.addTags([
                    { name: 'keywords', content: '' },
                    { name: 'Title', content: this.accountProductDetails.productName },
                    { name: 'author', content: 'Digamber Singh' },
                    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                    { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
                  ]);

                this.meta.updateTag({name:'og_image', property:'og:image', Content:this.imgUrl})
                this.meta.updateTag({name:'og_description' ,property:'og:description' , content:this.accountProductDetails.description})
                this.meta.updateTag({name:'description' , content:this.accountProductDetails.description})
                this.meta.updateTag({name:'og_url' , property:'og:url' , content:this.postUrl})
                this.meta.updateTag({name:'og_title', property:'og:title', content:this.accountProductDetails.productName})

            });

        // Get Account Id
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
