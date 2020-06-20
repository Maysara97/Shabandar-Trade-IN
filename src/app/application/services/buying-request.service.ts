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
        buyingRequest: BuyingRequest,
        tagResult,
        coverageResult,
        agentsResult
    ): Observable<BuyingRequest> {
        const body = {
            productId: buyingRequest.productId,
            categoryId: buyingRequest.categoryId,
            title: buyingRequest.title,
            image: buyingRequest.image,
            location: buyingRequest.location,
            size: buyingRequest.size,
            wieght: buyingRequest.wieght,
            packing: buyingRequest.packing,
            certification: buyingRequest.certification,
            type: buyingRequest.type,
            grade: buyingRequest.grade,
            storage: buyingRequest.storage,
            brandName: tagResult,
            code: buyingRequest.code,
            moq: buyingRequest.moq,
            paymentTerms: buyingRequest.paymentTerms,
            unitePrice: buyingRequest.unitePrice,
            price: buyingRequest.price,
            duration: buyingRequest.duration,
            accomdationName: buyingRequest.accomdationName,
            program: buyingRequest.program,
            tripCategory: buyingRequest.tripCategory,
            space: buyingRequest.space,
            finishedStatus: buyingRequest.finishedStatus,
            coverage: coverageResult,
            serviceType: buyingRequest.serviceType,
            agentsLocation: agentsResult,
            softwares: buyingRequest.softwares,
            description: buyingRequest.description,
        }
        console.log(body)
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
    getAllBuyingRequests() {
        return this.getAll('BuyingRequest/AllBuyingRequests')
    }
    getBuyingRequestsByOwner() {
        return this.getAll('BuyingRequest/BuyingRequestsByOwner')
    }
    getBuyingRequestById(buyingRequestId: string) {
        return this.getById('BuyingRequest', buyingRequestId)
    }
}
