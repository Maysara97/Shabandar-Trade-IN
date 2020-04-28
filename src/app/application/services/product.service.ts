import { BaseService } from 'src/app/shared/core/base.service'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { Product } from '../models/product'

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService<any> {
    constructor(injector: Injector) {
        super(injector)
    }

    createProduct(product: Product) {
        return this.post('Product', product)
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
    getProductById(productId: string) {
        return this.getById('Product', productId)
    }
}
