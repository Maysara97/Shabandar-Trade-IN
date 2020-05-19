import { BaseService } from 'src/app/shared/core/base.service'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { BuyingRequest } from '../models/buying-request'

@Injectable({ providedIn: 'root' })
export class BuyingRequestService extends BaseService<any> {
    constructor(injector: Injector) {
        super(injector)
    }

    createBuyingRequest(buyingRequest: BuyingRequest) {
        return this.post('BuyingRequest', buyingRequest)
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
    getBuyingRequestsByOwner(accountId: string) {
        return this.getById('BuyingRequest/BuyingRequestsByOwner', accountId)
    }
}
