import { BaseService } from 'src/app/shared/core/base.service'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { Product } from '../models/product'

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService<any> {
    constructor(injector: Injector) {
        super(injector)
    }

    createProduct(product: Product): Observable<Product> {
        const body = {
            productId: product.productId,
            // categoryId: product.categoryId,
            // productImage: product.productImage,
            // attachments: product.attachments,
        }
        return this.post('Product', body)
    }
    updateProduct(product: Product) {
        return this.put('Product', product)
    }
    deleteProduct(productId: string) {
        return this.remove('Product', productId)
    }
    restoreProduct(productId: string) {
        return this.remove('Product/Restore', productId)
    }
    getAllProducts(): Observable<Product[]> {
        return this.getAll('Product/AllProducts')
    }
    getProductsByOwner() {
        return this.getAll('Product/ProductsByOwner')
    }
    getProductsByCategory(productId: string) {
        return this.getById('Product/ProductsByCategory', productId)
    }
}
