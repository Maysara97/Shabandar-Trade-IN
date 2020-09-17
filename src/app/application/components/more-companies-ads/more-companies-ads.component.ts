import { Component, OnInit } from '@angular/core'
import { Ads } from '../../models/ads'
import { AdsService } from '../../services/ads.service'
import { ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment'
import { CategoryService } from '../../services/category.service'
import { Category } from '../../models/category'

@Component({
    selector: 'app-more-companies-ads',
    templateUrl: './more-companies-ads.component.html',
    styleUrls: ['./more-companies-ads.component.scss'],
})
export class MoreCompaniesAdsComponent implements OnInit {
    allAdsByCategory: Ads[]
    targetCat: Category
    categoryId
    env: any
    constructor(
        private adsService: AdsService,
        private route: ActivatedRoute,
        private categoryService: CategoryService
    ) {
        this.categoryId = route.snapshot.params['categoryId']
        this.env = environment
    }

    ngOnInit(): void {
        this.adsService
            .getAllCategoryAdsById(this.categoryId)
            .subscribe((res: any) => {
                this.allAdsByCategory = res.data
            })

        this.categoryService
            .getCategoryById(this.categoryId)
            .subscribe((res: any) => {
                this.targetCat = res.data
            })
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
