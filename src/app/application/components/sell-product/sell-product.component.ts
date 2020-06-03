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

@Component({
    selector: 'app-sell-product',
    templateUrl: './sell-product.component.html',
    styleUrls: ['./sell-product.component.scss'],
})
export class SellProductComponent implements OnInit {
    searchText
    categories$: Observable<Category[]>
    categories: Category[]
    accountProducts: AccountProduct[]
    products: Product[]
    countries: Country[]
    filteredCategories = []
    env: any
    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private accountProductService: AccountProductService,
        private productService: ProductService,
        private countryService: CountryService
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
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
