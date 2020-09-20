import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Category } from '../../models/category'
import { Product } from '../../models/product'
import { BuyingRequest } from '../../models/buying-request'
import { Country } from '../../models/country'
import { PageEvent } from '@angular/material/paginator'
import { CategoryService } from '../../services/category.service'
import { ProductService } from '../../services/product.service'
import { BuyingRequestService } from '../../services/buying-request.service'
import { CountryService } from '../../services/country.service'
import { environment } from 'src/environments/environment'
import { AuthService } from 'src/app/shared/services/auth.service'
import { AdsService } from '../../services/ads.service'
import { Ads } from '../../models/ads'

@Component({
    selector: 'app-buying-request',
    templateUrl: './buying-request.component.html',
    styleUrls: ['./buying-request.component.scss'],
})
export class BuyingRequestComponent implements OnInit {
    searchText
    categories$: Observable<Category[]>
    products$: Observable<Product[]>
    buyingRequestProducts: BuyingRequest[] = []
    categories: Category[]
    subCategories: Category[]
    products: Product[]
    countries: Country[]
    filteredCategories = []
    page: number = 1
    env: any

    pageNumber = 1
    pageSize = 6
    searchKeyWord = ''
    categoryId = ''
    SubCategoryId = ''
    countryId = ''
    dateFrom = ''
    dateTo = ''
    totalCount = 0
    pageEvent: PageEvent
    pageSizeOptions: number[] = [6, 9, 12, 15]
    isLoggedIn

    buyingRequestAds: Ads[]
    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private buyingRequestService: BuyingRequestService,
        private countryService: CountryService,
        private auth: AuthService,
        private adService: AdsService
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
        this.categoryService.getAllParents().subscribe((result: any) => {
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
            '',
            ''
        )

        // Take the ID from Category on select
        this.onChooseCategory(this.categoryId)

        this.auth.isAuthed.subscribe((result) => {
            this.isLoggedIn = result
        })

        this.adService.getAllBuyingRequestAds().subscribe((res: any) => {
            this.buyingRequestAds = res.data
        })
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
            this.SubCategoryId,
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
            this.SubCategoryId,
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
        SubCategoryId,
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
                SubCategoryId,
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
        this.categoryService
            .getCategoriesByParentId(category)
            .subscribe((result: any) => {
                this.subCategories = result.data
            })
    }
    onChooseSubCategory(subCategory) {
        this.SubCategoryId = subCategory
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
            '',
            ''
        )
    }
}
