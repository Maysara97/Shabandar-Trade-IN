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
            productId: buyingRequest.productId,
            description: buyingRequest.description,
            title: buyingRequest.title,
            images: buyingRequest.images,
        }
        return this.post('BuyingRequest', body)
    }
    updateBuyingRequest(buyingRequest: BuyingRequest) {
        return this.put('BuyingRequest', buyingRequest)
    }
    getBuyingRequestIdById(buyingRequestId: string) {
        return this.getById('BuyingRequest', buyingRequestId)
    }
    deleteBuyingRequest(buyingRequestId: string) {
        return this.remove('BuyingRequest', buyingRequestId)
    }
    restoreBuyingRequest(buyingRequestId: string) {
        return this.remove('BuyingRequest/Restore', buyingRequestId)
    }
    getAllBuyingRequests(): Observable<BuyingRequest[]> {
        return this.getAll('BuyingRequest/AllBuyingRequests')
    }
    getBuyingRequestsByOwner(): Observable<BuyingRequest[]> {
        return this.getAll('BuyingRequest/BuyingRequestsByOwner')
    }
}
