import { Component, OnInit, HostBinding, TemplateRef } from '@angular/core'
import { AuthService } from 'src/app/shared/services/auth.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { CategoryService } from 'src/app/application/services/category.service'
import { Category } from 'src/app/application/models/category'
import { environment } from 'src/environments/environment'
import { Ads } from 'src/app/application/models/ads'
import { AdsService } from 'src/app/application/services/ads.service'
import {FormsModule} from '@angular/forms'
import {HttpClient} from '@angular/common/http'
import { searching } from 'src/app/application/models/search'
import { Router } from '@angular/router'

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
    isLoggedIn
    myBackgroundImageUrl = './assets/images/You-Trade-In/slider.png'
    subCategoryModal: BsModalRef
    myForm : FormsModule
    searchText;  
    pageNumber = 1
    pageSize = 6
    searchKeyWord = ''
    categories: Category[]
    env: any
    subCategories: Category[]
    sponsoredAds: Ads[]
    billboardAds: Ads[]
    constructor(
        private auth: AuthService,
        private modalService: BsModalService,
        private categoryService: CategoryService,
        private adsService: AdsService,
        private _HttpClient:HttpClient,
        private router: Router,
        
    ) {
        this.env = environment
    }

    ngOnInit() {
        this.auth.isAuthed.subscribe((result) => {
            this.isLoggedIn = result
        })

        this.categoryService.getAllParents().subscribe((result: any) => {
            this.categories = result.data
        })

        this.adsService.getAllSponsersAds().subscribe((res: any) => {
            this.sponsoredAds = res.data
        })

        this.adsService.getAllBillboardAds().subscribe((res: any) => {
            this.billboardAds = res.data
        })
    }

    subCategory(template: TemplateRef<any>, categoryId) {
        this.subCategoryModal = this.modalService.show(template, {
            class: 'modal-lg',
        })

        this.categoryService
            .getCategoriesByParentId(categoryId)
            .subscribe((res: any) => {
                this.subCategories = res.data
            })
    }
    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }


    getSearch(eventInfo){
        console.log(eventInfo)
        this.router.navigateByUrl(`/application/search/${eventInfo}`)
    }


    closeSubDialog(): void {
        this.subCategoryModal.hide()
    }
}
