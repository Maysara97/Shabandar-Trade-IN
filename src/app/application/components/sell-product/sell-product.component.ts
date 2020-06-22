import { Component, OnInit } from '@angular/core'
import { CategoryService } from '../../services/category.service'
import { Observable } from 'rxjs'
import { Category } from '../../models/category'
import { Router, NavigationEnd } from '@angular/router'
import { AccountProductService } from '../../services/accountProduct.service'
import { AccountProduct } from '../../models/accountProduct'
import { ProductService } from '../../services/product.service'
import { Product } from '../../models/product'
import { CountryService } from '../../services/country.service'
import { environment } from 'src/environments/environment'
import { Country } from '../../models/country'
import { PageEvent } from '@angular/material/paginator'
import { SearchAccountProduct } from '../../models/accountProduct-search'
import { AccountData } from 'src/app/account/models/register'
import { ToastrService } from 'ngx-toastr'
import { FavoriteService } from '../../services/favorite.service'

@Component({
    selector: 'app-sell-product',
    templateUrl: './sell-product.component.html',
    styleUrls: ['./sell-product.component.scss'],
})
export class SellProductComponent implements OnInit {
    searchText
    categories$: Observable<Category[]>
    categories: Category[]
    accountProducts: AccountProduct[] = []
    products: Product[]
    countries: Country[]
    filteredCategories = []
    env: any
    page: number = 1

    account: AccountData
    isFavorite = false
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

    searchAccountProduct: SearchAccountProduct
    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private accountProductService: AccountProductService,
        private productService: ProductService,
        private countryService: CountryService,
        private toastr: ToastrService,
        private favoriteService: FavoriteService
    ) {
        this.env = environment
    }

    ngOnInit(): void {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })

        // Bind all Categories
        this.categoryService.getAllCategories().subscribe((result: any) => {
            this.categories = result.data
        })

        // Bind all Account Products
        this.accountProductService
            .getAllAccountProducts()
            .subscribe((result: any) => {
                this.accountProducts = result.data
            })

        // Bind all Products
        this.productService.getAllProducts().subscribe((result: any) => {
            this.products = result.data
        })

        // Bind all Countries
        this.countryService.getAllCountries().subscribe((result: any) => {
            this.countries = result.data
        })

        this.getAccountProducts(
            this.pageSize,
            this.pageNumber,
            '',
            '',
            '',
            '',
            ''
        )

        this.onChooseCategory(this.categoryId)
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }

    handleOnPageChange(pageEvent: PageEvent) {
        this.getAccountProducts(
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
        this.getAccountProducts(
            this.pageSize,
            this.page,
            this.searchKeyWord,
            this.categoryId,
            this.countryId,
            this.dateFrom,
            this.dateTo
        )
    }

    getAccountProducts(
        pageSize,
        pageNumber,
        searchKeyWord,
        categoryId,
        countryId,
        dateFrom,
        dateTo
    ) {
        this.accountProductService
            .getAccountProductSearch(
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
                    this.accountProducts = res.data
                    this.totalCount = res.totalRecords
                }
            })
    }

    favorite(isFavorite) {
        this.favoriteService.createFavorite(isFavorite).subscribe((res) => {
            this.account.isFavorite = true
        })
    }

    onChooseCategory(category) {
        this.categoryId = category
    }
}
