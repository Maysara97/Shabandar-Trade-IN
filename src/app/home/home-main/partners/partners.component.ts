import { Component, OnInit } from '@angular/core'
import { AdsService } from 'src/app/application/services/ads.service'
import { Ads } from 'src/app/application/models/ads'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent implements OnInit {
    partnerAds: Ads[]
    env: any
    constructor(private adsService: AdsService) {
        this.env = environment
    }

    ngOnInit(): void {
        this.adsService.getAllOurPartnerAds().subscribe((res: any) => {
            this.partnerAds = res.data
        })
    }
    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
