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
import { FavoriteService } from '../../services/favorite.service'
import { MatDialog } from '@angular/material/dialog'
import { SendMessageComponent } from '../send-message/send-message.component'
import { AuthService } from 'src/app/shared/services/auth.service'
@Component({
    selector: 'app-sell-product',
    templateUrl: './sell-product.component.html',
    styleUrls: ['./sell-product.component.scss'],
})
export class SellProductComponent implements OnInit {
    searchText
    categories$: Observable<Category[]>
    categories: Category[]
    subCategories: Category[]
    accountProducts: AccountProduct[] = []
    products: Product[]
    countries: Country[]
    filteredCategories = []
    env: any
    page: number = 1
    account: AccountData
    myAccount:AccountData
    accountId

    isFavorite = false
    pageNumber = 1
    pageSize = 6
    searchKeyWord = ''
    categoryId = ''
    SubCategoryId = ''
    productId = ''
    countryId = ''
    dateFrom = ''
    dateTo = ''
    totalCount = 0
    pageEvent: PageEvent
    pageSizeOptions: number[] = [6, 9, 12, 15]

    searchAccountProduct: SearchAccountProduct
    isLoggedIn
    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private accountProductService: AccountProductService,
        private productService: ProductService,
        private countryService: CountryService,
        private favoriteService: FavoriteService,
        public dialog: MatDialog,
        private auth: AuthService
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
        this.categoryService.getAllParents().subscribe((result: any) => {
            this.categories = result.data
        })

        // Bind all Account Products
        this.accountProductService
            .getAllAccountProducts()
            .subscribe((result: any) => {
                this.accountProducts = result.data
            })

     //Account details
            this.auth.getAccountDetails()
            .subscribe((result: any) => {
                this.myAccount = result.data
                //accountId
                this.accountId=this.myAccount.accountId
            })
  


        // Bind all Products
        // this.productService.getAllProducts().subscribe((result: any) => {
        //     this.products = result.data
        // })

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
            '',
            ''
        )

        this.onChooseCategory(this.categoryId)
        this.auth.isAuthed.subscribe((result) => {
            this.isLoggedIn = result
        })
      
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
            this.SubCategoryId,
            this.categoryId,
            this.dateFrom,
            this.dateTo
        )
    }
    applyFilter() {
        this.getAccountProducts(
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

    getAccountProducts(
        pageSize,
        pageNumber,
        searchKeyWord,
        categoryId,
        subCategoryId,
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
                subCategoryId,
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
        this.applyFilter()

        this.categoryService
            .getCategoriesByParentId(category)
            .subscribe((result: any) => {
                this.subCategories = result.data
            })
    }
    onChooseSubCategory(subCategory) {
        // this.productService
        //     .getProductsByCategory(subCategory)
        //     .subscribe((result: any) => {
        //         this.products = result.data
        //     })
        this.SubCategoryId = subCategory
        this.applyFilter()
    }

    onChooseProduct(product) {
        this.productId = product
        this.applyFilter()
    }
    allProductWithoutSearch() {
        this.accountProductService
            .getAllAccountProducts()
            .subscribe((response: any) => {
                this.accountProducts = response.data
            })
        this.getAccountProducts(
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
