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
            productName: buyingRequest.productName,
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
    updateBuyingRequest(
        buyingRequest: BuyingRequest,
        tagResult,
        coverageResult,
        agentsResult,
        images,
        certifications
        
    ) {
        const body = {
            buyingRequestId: buyingRequest.buyingRequestId,
            productId: buyingRequest.productId,
            categoryId: buyingRequest.categoryId,
            productName: buyingRequest.productName,
            title: buyingRequest.title,
            image: images[0],
            location: buyingRequest.location,
            size: buyingRequest.size,
            wieght: buyingRequest.wieght,
            packing: buyingRequest.packing,
            certification: certifications[0],
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
        countryId: number,
        dateFrom: string,
        dateTo: string
    ) {
        return this.getAll(
            `BuyingRequest/BuyingRequestSearch/${pageSize}/${pageNumber}?SearchKeyWord=${searchKeyWord}&CategoryId=${categoryId}&CountryId=${countryId}&DateFrom=${dateFrom}&DateTo=${dateTo}`
        )
    }

    getBuyingRequestsByOwnerID(accountId: string) {
        return this.getById(
            'BuyingRequest/BuyingRequestsByAccountId',
            accountId
        )
    }
}
