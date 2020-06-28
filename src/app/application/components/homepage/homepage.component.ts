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
    buyingRequestProducts: BuyingRequest[] = []
    categories: Category[]
    products: Product[]
    countries: Country[]
    filteredCategories = []
    page: number = 1
    env: any

    pageNumber = 1
    pageSize = 6
    searchKeyWord = ''
    categoryId = ''
    countryId = ''
    dateFrom = ''
    dateTo = ''
    totalCount = 0
    pageEvent: PageEvent
    pageSizeOptions: number[] = [6, 9, 12, 15]

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

        // Get all Buying Requests when using Search Function
        this.getBuyingRequests(
            this.pageSize,
            this.pageNumber,
            '',
            '',
            '',
            '',
            ''
        )

        // Take the ID from Category on select
        this.onChooseCategory(this.categoryId)
    }
    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }

    handleOnPageChange(pageEvent: PageEvent) {
        this.getBuyingRequests(
            pageEvent.pageSize,
            pageEvent.pageIndex + 1,
            this.searchKeyWord,
            this.countryId,
            this.categoryId,
            this.dateFrom,
            this.dateTo
        )
        console.log(pageEvent)
    }
    applyFilter() {
        this.getBuyingRequests(
            this.pageSize,
            this.page,
            this.searchKeyWord,
            this.categoryId,
            this.countryId,
            this.dateFrom,
            this.dateTo
        )
    }

    getBuyingRequests(
        pageSize,
        pageNumber,
        searchKeyWord,
        categoryId,
        countryId,
        dateFrom,
        dateTo
    ) {
        this.buyingRequestService
            .getBuyingRequestSearch(
                pageSize,
                pageNumber,
                searchKeyWord,
                categoryId,
                countryId,
                dateFrom,
                dateTo
            )
            .subscribe((res: any) => {
                if (res.isSucceeded) {
                    this.buyingRequestProducts = res.data
                    this.totalCount = res.totalRecords
                }
            })
    }

    onChooseCategory(category) {
        this.categoryId = category
        this.applyFilter()
    }

    allProductWithoutSearch() {
        this.buyingRequestService
            .getAllBuyingRequests()
            .subscribe((response: any) => {
                this.buyingRequestProducts = response.data
            })

        this.getBuyingRequests(
            this.pageSize,
            this.pageNumber,
            '',
            '',
            '',
            '',
            ''
        )
    }
}
