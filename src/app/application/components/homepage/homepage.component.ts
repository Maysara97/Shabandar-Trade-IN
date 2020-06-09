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
import { environment } from 'src/environments/environment'
import { PageEvent } from '@angular/material/paginator'

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

    env: any

    pageNumber = 1
    pageSize = 8
    search = ''
    totalCount = 0
    pageSizeOptions: number[] = [8, 16, 24, 32, 40]
    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private buyingRequestService: BuyingRequestService,
        private countryService: CountryService
    ) {
        this.env = environment
    }

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
    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
    // handleOnPageChange(pageEvent: PageEvent) {
    //     this.getRequestedProducts(
    //         pageEvent.pageSize,
    //         pageEvent.pageIndex,
    //         this.search
    //     )
    // }
    // getRequestedProducts(pageSize, pageNumber, search) {
    //     this.buyingRequestService
    //         .getBuyingRequests(pageSize, pageNumber, search)
    //         .subscribe((res) => {
    //             if (res.isSucceeded) {
    //                 this.buyingRequestProducts = res.data

    //                 // this.totalCount = res.totalRecords
    //             }
    //         })
    // }
}
