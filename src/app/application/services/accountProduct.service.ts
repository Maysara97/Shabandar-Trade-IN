import { BaseService } from 'src/app/shared/core/base.service'
import { Injectable, Injector } from '@angular/core'
import { AccountProduct } from '../models/accountProduct'
import { Observable } from 'rxjs'
import { SearchAccountProduct } from '../models/accountProduct-search'

@Injectable({ providedIn: 'root' })
export class AccountProductService extends BaseService<any> {
    constructor(injector: Injector) {
        super(injector)
    }

    createAccountProduct(
        accountProduct: AccountProduct,
        tagResult,
        coverageResult,
        agentsResult
    ): Observable<AccountProduct> {
        const body = {
            productId: accountProduct.productId,
            location: accountProduct.location,
            size: accountProduct.size,
            wieght: accountProduct.wieght,
            packing: accountProduct.packing,
            certification: accountProduct.certification,
            type: accountProduct.type,
            grade: accountProduct.grade,
            storage: accountProduct.storage,
            brandName: tagResult,
            code: accountProduct.code,
            moq: accountProduct.moq,
            paymentTerms: accountProduct.paymentTerms,
            unitePrice: accountProduct.unitePrice,
            price: accountProduct.price,
            duration: accountProduct.duration,
            accomdationName: accountProduct.accomdationName,
            program: accountProduct.program,
            tripCategory: accountProduct.tripCategory,
            space: accountProduct.space,
            finishedStatus: accountProduct.finishedStatus,
            coverage: coverageResult,
            serviceType: accountProduct.serviceType,
            agentsLocation: agentsResult,
            softwares: accountProduct.softwares,
            description: accountProduct.description,
            productImages: accountProduct.productImages,
            attachments: accountProduct.attachments,
        }
        console.log(body)
        return this.post('AccountProduct', body)
    }
    updateAccountProduct(accountProduct: AccountProduct) {
        return this.put('AccountProduct', accountProduct)
    }
    deleteAccountProduct(accountProductId: string) {
        return this.remove('AccountProduct', accountProductId)
    }
    restoreAccountProduct(accountProductId: string) {
        return this.remove('AccountProduct/Restore', accountProductId)
    }
    getAccountProductsByOwner() {
        return this.getAll('AccountProduct/AccountProductsByOwner')
    }
    getAllAccountProducts() {
        return this.getAll('AccountProduct/AllAccountProducts')
    }
    getAccountProductById(accountProductId: string) {
        return this.getById('AccountProduct', accountProductId)
    }

    // getAccountProducts(
    //     pageSize: number,
    //     pageNumber: number,
    //     searchAccountProduct: SearchAccountProduct
    // ) {
    //     return this.post(
    //         `AccountProduct/AccountProductsSearch/${pageSize}/${pageNumber}`,
    //         searchAccountProduct
    //     )
    // }
    getAccountProductSearch(
        pageSize: number,
        pageNumber: number,
        searchKeyWord: string,
        categoryId: number,
        countryId: number,
        dateFrom: string,
        dateTo: string
    ) {
        return this.getAllResult(
            `AccountProduct/AccountProductsSearch/${pageSize}/${pageNumber}/${searchKeyWord}/${categoryId}/${countryId}/${dateFrom}/${dateTo}`
        )
    }
}
