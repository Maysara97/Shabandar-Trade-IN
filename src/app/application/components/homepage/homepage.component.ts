import { Component, OnInit } from '@angular/core'
import { Category } from '../../models/category'
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { Observable } from 'rxjs'
import { CategoryService } from '../../services/category.service'
import { Product } from '../../models/product'
import { ProductService } from '../../services/product.service'

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
    searchText
    categories$: Observable<Category[]>
    products$: Observable<Product[]>

    categories = [
        {
            categoryName: 'Industry',
        },
        {
            categoryName: 'Tourism',
        },
        {
            categoryName: 'Real Estate',
        },
        {
            categoryName: 'Designers',
        },
        {
            categoryName: 'Shipping & Logistics',
        },
    ]

    products = [
        {
            ProductName: 'Product One',
            CategoryId: 'Industry',
        },
        {
            ProductName: 'Product Two',
            CategoryId: 'Designers',
        },
        {
            ProductName: 'Product Three',
            CategoryId: 'Tourism',
        },
    ]
    filteredCategories = []
    constructor(
        private categoryService: CategoryService,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.getAllProducts()
        this.getAllCategories()
    }

    getAllCategories() {
        this.categories$ = this.categoryService.getAllCategories()
    }

    getAllProducts() {
        this.products$ = this.productService.getAllProducts()
    }
}
