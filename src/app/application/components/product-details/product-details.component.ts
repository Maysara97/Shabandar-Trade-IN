import { BuyingProductDetailsComponent } from './../buying-product-details/buying-product-details.component';
import { Component, OnInit, TemplateRef ,OnDestroy } from '@angular/core'
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
<<<<<<< HEAD
import { AccountData } from 'src/app/account/models/register'
import { AuthService } from 'src/app/shared/services/auth.service'
=======
// import { Page } from 'ngx-pagination/dist/pagination-controls.directive';
// import { Page } from 'tns-core-modules/ui/page';
>>>>>>> shareing updates


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
        private title: Title,
        
    ) {
        this.accountProductId = route.snapshot.params['accountProductId']
        this.env = environment
      
        
    }

    ngOnInit(): void {
       
        //Removing The Website Meta Tags
        this.meta.removeTag("name='og_url'")
        this.meta.removeTag("name='og_image'")
        this.meta.removeTag("name='og_type'")
        this.meta.removeTag("name='og_image_width'")
        this.meta.removeTag("name='og_image_height'")
        this.meta.removeTag("name='og_description'")
        this.meta.removeTag("name='og_title'")
        this.meta.removeTag("name='description'")
        
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
                
                //Adding Meta Tags For Specific Product
                this.meta.addTags([

                    { name:"og_url" , property:"og:url" , content:this.postUrl},
                    { name:"og_type" , property:"og:type" , content:"website"},
                    { name:"og_image", property:"og:image", Content:this.imgUrl},
                    { name:"og_image_width", property:"og:image:width", content:"600"},
                    { name:"og_image_height", property:"og:image:height", content:"600"},
                    { name:"og_description", property:"og:description", content:this.accountProductDetails.description},
                    { name:"og_title", property:"og:title", content:this.accountProductDetails.productName},
                    { name: 'Title', content: this.accountProductDetails.productName},
                    { name:"description", content: this.accountProductDetails.description}
                  ]);

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
