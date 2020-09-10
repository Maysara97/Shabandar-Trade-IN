import { Component, OnInit, Input } from '@angular/core'
import { CategoryService } from 'src/app/application/services/category.service'
import { AdsService } from 'src/app/application/services/ads.service'
import { Ads } from 'src/app/application/models/ads'
import { Category } from 'src/app/application/models/category'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-category-products',
    templateUrl: './category-products.component.html',
    styleUrls: ['./category-products.component.scss'],
})
export class CategoryProductsComponent implements OnInit {
    categoriesAds: Ads[]
    categories: Category[]
    env: any
    // @Input() categoryId
    constructor(
        private categoryService: CategoryService,
        private adsService: AdsService
    ) {
        this.env = environment
    }

    ngOnInit(): void {
        this.categoryService.getAllParents().subscribe((result: any) => {
            this.categories = result.data
        })
        // this.getCategoryId(this.categoryId)
    }

    // getCategoryId(categoryId) {
    //     this.adsService
    //         .getHomeCategoryAdsById(categoryId)
    //         .subscribe((result: any) => {
    //             this.categoriesAds = result.data
    //         })
    // }
    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
