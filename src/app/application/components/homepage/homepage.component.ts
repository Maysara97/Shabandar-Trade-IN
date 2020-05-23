import { Component, OnInit } from '@angular/core'
import { Category } from '../../models/category'
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { Observable } from 'rxjs'
import { CategoryService } from '../../services/category.service'
import { Product } from '../../models/product'
import { ProductService } from '../../services/product.service'
import { BuyingRequest } from '../../models/buying-request'
import { BuyingRequestService } from '../../services/buying-request.service'

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
    searchText
    categories$: Observable<Category[]>
    products$: Observable<Product[]>
    buyingRequestProducts: BuyingRequest[]
    categories: Category[]
    filteredCategories = []
    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private buyingRequestService: BuyingRequestService
    ) {}

    ngOnInit(): void {
        this.buyingRequestService
            .getAllBuyingRequests()
            .subscribe((response: any) => {
                this.buyingRequestProducts = response.data
            })

        this.categoryService.getAllCategories().subscribe((result: any) => {
            this.categories = result.data
        })

        // this.buyingRequestProducts$ = this.buyingRequestService.getAllBuyingRequests()
    }

    getAllCategories() {
        this.categories$ = this.categoryService.getAllCategories()
    }

    getAllProducts() {
        this.products$ = this.productService.getAllProducts()
    }
}
