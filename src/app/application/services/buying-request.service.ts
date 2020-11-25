import { BaseService } from 'src/app/shared/core/base.service'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { BuyingRequest } from '../models/buying-request'

@Injectable({ providedIn: 'root' })
export class BuyingRequestService extends BaseService<any> {
    constructor(injector: Injector) {
        super(injector)
    }

    createBuyingRequest(
        buyingRequest: BuyingRequest
    ): Observable<BuyingRequest> {
        const body = {
            categoryId: buyingRequest.categoryId,
            subCategoryId: buyingRequest.subCategoryId,
            title: buyingRequest.title,
            image: buyingRequest.image,
            location: buyingRequest.location,
            paymentTerms: buyingRequest.paymentTerms,
            unitePrice: buyingRequest.unitePrice,
            price: buyingRequest.price,
            description: buyingRequest.description,
        }
        return this.post('BuyingRequest', body)
    }
    updateBuyingRequest(buyingRequest: BuyingRequest, images): Observable<BuyingRequest> {
        const body = {
            buyingRequestId: buyingRequest.buyingRequestId,
            categoryId: buyingRequest.categoryId,
            subCategoryId: buyingRequest.subCategoryId,
            title: buyingRequest.title,
            image: images,
            location: buyingRequest.location,
            paymentTerms: buyingRequest.paymentTerms,
            unitePrice: buyingRequest.unitePrice,
            price: buyingRequest.price,
            description: buyingRequest.description,
        }
        return this.put('BuyingRequest', body)
    }
    getBuyingRequestIdById(buyingRequestId: string) {
        return this.getById('BuyingRequest', buyingRequestId)
    }
    deleteBuyingRequest(BuyingRequestId: string) {
        return this.remove('BuyingRequest', BuyingRequestId)
    }
    restoreBuyingRequest(buyingRequestId: string) {
        return this.remove('BuyingRequest/Restore', buyingRequestId)
    }
    getAllBuyingRequests() {
        return this.getAll('BuyingRequest/AllBuyingRequests')
    }
    getBuyingRequestsByOwner() {
        return this.getAll('BuyingRequest/BuyingRequestsByOwner')
    }
    getBuyingRequestById(buyingRequestId: string) {
        return this.getById('BuyingRequest', buyingRequestId)
    }

    getBuyingRequestSearch(
        pageSize: number,
        pageNumber: number,
        searchKeyWord: string,
        categoryId: number,
        SubCategoryId: number,
        countryId: number,
        dateFrom: string,
        dateTo: string
    ) {
        return this.getAll(
            `BuyingRequest/BuyingRequestSearch/${pageSize}/${pageNumber}?SearchKeyWord=${searchKeyWord}&CategoryId=${categoryId}&SubCategoryId=${SubCategoryId}&CountryId=${countryId}&DateFrom=${dateFrom}&DateTo=${dateTo}`
        )
    }

    getBuyingRequestsByOwnerID(accountId: string) {
        return this.getById(
            'BuyingRequest/BuyingRequestsByAccountId',
            accountId
        )
    }
}
