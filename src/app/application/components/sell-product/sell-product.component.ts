import { Component, OnInit } from '@angular/core'
import { CategoryService } from '../../services/category.service'
import { Observable } from 'rxjs'
import { Category } from '../../models/category'
import { Router, NavigationEnd } from '@angular/router'

@Component({
    selector: 'app-sell-product',
    templateUrl: './sell-product.component.html',
    styleUrls: ['./sell-product.component.scss'],
})
export class SellProductComponent implements OnInit {
    searchText
    categories$: Observable<Category[]>

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
        private router: Router
    ) {}

    ngOnInit(): void {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
    }

    getAllCategories() {
        this.categories$ = this.categoryService.getAllCategories()
    }
}
