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
            categoryId: accountProduct.categoryId,
            productName: accountProduct.productName,
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
            modelYear: accountProduct.modelYear,
            totalHours: accountProduct.totalHours,
            capacity: accountProduct.capacity,
        }
        return this.post('AccountProduct', body)
    }
    updateAccountProduct(
        accountProduct: AccountProduct,
        tagResult,
        coverageResult,
        agentsResult,
        images,
        files
    ): Observable<AccountProduct> {
        const body = {
            accountProductId: accountProduct.accountProductId,
            categoryId: accountProduct.categoryId,
            productName: accountProduct.productName,
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
            productImages: images,
            attachments: files,
            modelYear: accountProduct.modelYear,
            totalHours: accountProduct.totalHours,
            capacity: accountProduct.capacity,
        }
        return this.put('AccountProduct', body)
    }
    deleteAccountProduct(AccountProductId: string) {
        return this.remove('AccountProduct', AccountProductId)
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

    getAccountProductSearch(
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
            `AccountProduct/AccountProductsSearch/${pageSize}/${pageNumber}?searchKeyWord=${searchKeyWord}&CategoryId=${categoryId}&SubCategoryId=${SubCategoryId}&CountryId=${countryId}&DateFrom=${dateFrom}&DateTo=${dateTo}`
        )
    }

    getAccountProductByOwnerID(accountId: string) {
        return this.getById(
            'AccountProduct/AccountProductsByAccountId',
            accountId
        )
    }
}
