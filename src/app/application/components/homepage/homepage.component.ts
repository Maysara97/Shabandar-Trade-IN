import { Component, OnInit } from '@angular/core'
import { Category } from '../../models/category'
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { Observable } from 'rxjs'
import { CategoryService } from '../../services/category.service'
import { Product } from '../../models/product'
import { ProductService } from '../../services/product.service'
import { BuyingRequest } from '../../models/buying-request'
import { BuyingRequestService } from '../../services/buying-request.service'
import { CountryService } from '../../services/country.service'
import { Country } from '../../models/country'

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
    products: Product[]
    countries: Country[]
    filteredCategories = []
    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private buyingRequestService: BuyingRequestService,
        private countryService: CountryService
    ) {}

    ngOnInit(): void {
        // Bind all Buying Requests
        this.buyingRequestService
            .getAllBuyingRequests()
            .subscribe((response: any) => {
                this.buyingRequestProducts = response.data
            })

        // Bind all Categories
        this.categoryService.getAllCategories().subscribe((result: any) => {
            this.categories = result.data
        })

        // Bind all Products
        this.productService.getAllProducts().subscribe((result: any) => {
            this.products = result.data
        })

        // Bind all Countries
        this.countryService.getAllCountries().subscribe((result: any) => {
            this.countries = result.data
        })
    }
}
