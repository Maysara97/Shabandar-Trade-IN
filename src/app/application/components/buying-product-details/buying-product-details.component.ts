import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core'
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
        //Removing Meta Tags
        this.meta.removeTag("name='og_url'")
        this.meta.removeTag("name='og_image'")
        this.meta.removeTag("name='og_type'")
        this.meta.removeTag("name='og_image_width'")
        this.meta.removeTag("name='og_image_height'")
        this.meta.removeTag("name='og_description'")
        this.meta.removeTag("name='og_title'")
        this.meta.removeTag("name='description'")

        this.buyingRequestService
            .getBuyingRequestById(this.buyingRequestId)
            .subscribe((result: any) => {
                this.buyingRequestDetails = result.data
                this.whatsappPost =  `https://api.whatsapp.com/send?text=${'\n' +encodeURI(this.buyingRequestDetails.title + '\n' + this.buyingRequestDetails.description) + '\n' }  ${this.postUrl}`;
                this.twitterPost =  `https://twitter.com/share?url=${this.postUrl}&text=${'\n' +encodeURI(this.buyingRequestDetails.title + '\n' + this.buyingRequestDetails.description + '\n' )}`;
                this.imgUrl = this.getFilePath(this.buyingRequestDetails.image[0]);
                
                //Setting The Title Of This page as the product name.
                this.title.setTitle(this.buyingRequestDetails.title);
              

                  
                //Adding Meta Tags For Specific Product
                  this.meta.addTags([
                    { name:"og_url" , property:"og:url" , content:this.postUrl},
                    { name:"og_type" , property:"og:type" , content:"website"},
                    { name:"og_image", property:"og:image", Content:this.imgUrl},
                    { name:"og_image_width", property:"og:image:width", content:"600"},
                    { name:"og_image_height", property:"og:image:height", content:"600"},
                    { name:"og_description", property:"og:description", content:this.buyingRequestDetails.description},
                    { name:"og_title", property:"og:title", content:this.buyingRequestDetails.title},
                    { name: 'Title', content: this.buyingRequestDetails.title},
                    { name:"description", content: this.buyingRequestDetails.description}
                  ]);
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

    ngOnDestroy() :void{
        //Restore The Title When Navigate Away
        this.title.setTitle("Shah-bandar Trade")
        

        //Removing The Product Meta Tags
        this.meta.removeTag("name='og_url'")
        this.meta.removeTag("name='og_image'")
        this.meta.removeTag("name='og_type'")
        this.meta.removeTag("name='og_image_width'")
        this.meta.removeTag("name='og_image_height'")
        this.meta.removeTag("name='og_description'")
        this.meta.removeTag("name='og_title'")
        this.meta.removeTag("name='description'")
        this.meta.removeTag("name='Title'")

        //Adding Meta Tags For The Website
        this.meta.addTags([
            { name: 'og_title', content: "Shah-bandar Trade"},
            { name:"og_url", property:"og:url", content:"https://shahbandartrade.com/home/home-main"},
            { name:"og_type" ,property:"og:type", content:"website" },
            { name:"og_image", property:"og:image", content:"https://i.ibb.co/6wNTHyB/logo.png"},
            { name:"og_image_width", property:"og:image:width", content:"600" },
            { name:"og_image_height", property:"og:image:height", content:"600"},
            { name:"og_description", property:"og:description", content:"Shahbandar is a digital platform that will have forms to be filled for merchants."},
            { name:"description", content: "Shahbandar is a digital platform that will have forms to be filled for merchants."}
            
          ]);
        
    }
}
 