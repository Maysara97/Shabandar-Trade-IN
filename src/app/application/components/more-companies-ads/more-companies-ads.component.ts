import { Component, OnInit } from '@angular/core'
import { Ads } from '../../models/ads'
import { AdsService } from '../../services/ads.service'
import { ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-more-companies-ads',
    templateUrl: './more-companies-ads.component.html',
    styleUrls: ['./more-companies-ads.component.scss'],
})
export class MoreCompaniesAdsComponent implements OnInit {
    allAdsByCategory: Ads[]
    categoryId
    env: any
    constructor(private adsService: AdsService, private route: ActivatedRoute) {
        this.categoryId = route.snapshot.params['categoryId']
        this.env = environment
    }

    ngOnInit(): void {
        this.adsService
            .getAllCategoryAdsById(this.categoryId)
            .subscribe((res: any) => {
                this.allAdsByCategory = res.data
            })
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
