import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { BaseService } from 'src/app/shared/core/base.service'
import { Ads } from '../models/ads'

@Injectable({ providedIn: 'root' })
export class AdsService extends BaseService<any> {
    constructor(injector: Injector) {
        super(injector)
    }

    createAds(ads: Ads) {
        return this.post('AccountAds', ads)
    }
    updateAds(ads: Ads) {
        return this.put('AccountAds', ads)
    }
    deleteAds(adId: string) {
        return this.remove('AccountAds', adId)
    }
    restoreAds(adId: string) {
        return this.remove('AccountAds/Restore', adId)
    }

    getAdsById(adId: string) {
        return this.getById('AccountAds', adId)
    }
    getAllBillboardAds(): Observable<Ads[]> {
        return this.getAll('AccountAds/AllBillboardAds')
    }
    getAllBuyingRequestAds(): Observable<Ads[]> {
        return this.getAll('AccountAds/AllBuyingRequestAds')
    }
    getAllSponsersAds(): Observable<Ads[]> {
        return this.getAll('AccountAds/AllSponsersAds')
    }
    getAllOurPartnerAds(): Observable<Ads[]> {
        return this.getAll('AccountAds/AllOurPartnerAds')
    }
    getHomeCategoryAdsById(categoryId: string) {
        return this.getById('AccountAds/HomeCategoryAds', categoryId)
    }
    getAllCategoryAdsById(categoryId: string) {
        return this.getById('AccountAds/AllCategoryAds', categoryId)
    }

    getAllAds(): Observable<Ads[]> {
        return this.getAll('AccountAds/AllAds')
    }
}
