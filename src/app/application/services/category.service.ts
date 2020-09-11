import { BaseService } from 'src/app/shared/core/base.service'
import { Injectable, Injector } from '@angular/core'
import { Category } from '../models/category'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService<any> {
    constructor(injector: Injector) {
        super(injector)
    }

    createCategory(category: Category) {
        return this.post('Category', category)
    }
    updateCategory(category: Category) {
        return this.put('Category', category)
    }
    deleteCategory(categoryId: string) {
        return this.remove('Category', categoryId)
    }
    restoreCategory(categoryId: string) {
        return this.remove('Category/Restore', categoryId)
    }
    getAllCategories(): Observable<Category[]> {
        return this.getAll('Category/Allcategories')
    }
    getCategoryById(categoryId: string) {
        return this.getById('Category', categoryId)
    }
    getCategoriesByParentId(parentId: string) {
        return this.getById('Category/CategoriesByParentId', parentId)
    }
    getAllParents(): Observable<Category[]> {
        return this.getAll('Category/AllParents')
    }
    getParentsWithAds(): Observable<Category[]> {
        return this.getAll('Category/GetParentsWithAds')
    }
}
