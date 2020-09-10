import { Component, OnInit, HostBinding, TemplateRef } from '@angular/core'
import { AuthService } from 'src/app/shared/services/auth.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { CategoryService } from 'src/app/application/services/category.service'
import { Category } from 'src/app/application/models/category'
import { environment } from 'src/environments/environment'
import { Ads } from 'src/app/application/models/ads'
import { AdsService } from 'src/app/application/services/ads.service'

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
    isLoggedIn
    myBackgroundImageUrl = './assets/images/You-Trade-In/slider.png'
    subCategoryModal: BsModalRef

    categories: Category[]
    env: any
    subCategories: Category[]
    sponsoredAds: Ads[]
    billboardAds: Ads[]
    constructor(
        private auth: AuthService,
        private modalService: BsModalService,
        private categoryService: CategoryService,
        private adsService: AdsService
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
    // @HostBinding('style.backgroundImage')
    // getBackgroundImageUrl() {
    //     return `url(${this.myBackgroundImageUrl})`
    // }

    subCategory(template: TemplateRef<any>, parentId) {
        this.subCategoryModal = this.modalService.show(template, {
            class: 'modal-md',
        })

        this.categoryService
            .getCategoriesByParentId(parentId)
            .subscribe((res: any) => {
                this.subCategories = res.data
            })
    }
    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
