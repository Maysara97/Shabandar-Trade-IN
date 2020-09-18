import { Component, OnInit } from '@angular/core'
import { Product } from '../../models/product'
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms'
import { Router, NavigationEnd } from '@angular/router'
import { ProductService } from '../../services/product.service'
import { ToastrService } from 'ngx-toastr'
import { BuyingRequest } from '../../models/buying-request'
import { BuyingRequestService } from '../../services/buying-request.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { FileImage } from 'src/app/shared/models/file'
import { Category } from '../../models/category'
import { Country } from '../../models/country'
import { CategoryService } from '../../services/category.service'
import { CountryService } from '../../services/country.service'
import {
    FinishedStatusTypeMapping,
    FinishedStatusType,
} from '../../models/enum'

@Component({
    selector: 'app-add-new-request-form',
    templateUrl: './add-new-request-form.component.html',
    styleUrls: ['./add-new-request-form.component.scss'],
})
export class AddNewRequestFormComponent implements OnInit {
    categorySelected
    productSelected
    countrySelected
    unitePriceSelected
    finishedStatusSelected
    anotherProductSelected
    subCategorySelected
    productSubCatSelected

    submitted = false
    data = false
    message: string
    products$: Observable<Product[]>
    products: Product[]
    productSubCat: Product[]
    selectedProduct: Product
    addBuyingRequestForm: FormGroup
    allProducts = []
    requestProduct: BuyingRequest
    images: string[] = []
    tagNames = []
    tagCoverage = []
    agents = []
    categories: Category[]
    subCategories: Category[]
    countries: Country[]

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private productService: ProductService,
        private toastr: ToastrService,
        private buyingRequestService: BuyingRequestService,
        private categoryService: CategoryService,
        private countryService: CountryService
    ) {}

    ngOnInit(): void {
        // Bind all Countries
        this.countryService.getAllCountries().subscribe((result: any) => {
            this.countries = result.data
        })
        // Bind all Parents Categories
        this.categoryService.getAllParents().subscribe((result: any) => {
            this.categories = result.data
        })
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
        this.addBuyingRequestForm = this.formBuilder.group({
            productId: [],
            title: [null, [Validators.required]],
            productName: [],
            unitePrice: [],
            image: [null, [Validators.required]],
            price: [],
            categoryId: [this.categorySelected, [Validators.required]],
            subCategoryId: [null, [Validators.required]],
            paymentTerms: [],
            description: [],
            location: [],
        })

        this.productSelected = -1
        this.categorySelected = -1
        this.countrySelected = -1
        this.unitePriceSelected = -1
        this.finishedStatusSelected = -1
        this.subCategorySelected = -1
        this.productSubCatSelected = -1
    }

    // Upload Image
    handleImageUpload(files: FileImage[]) {
        this.addBuyingRequestForm.patchValue({
            image: files.map((file) => file.imageFile),
        })
    }
    handleImageRemove(files: FileImage[]) {
        this.addBuyingRequestForm.patchValue({
            image: files.map((file) => file.imageFile),
        })
    }

    // Upload Certifications
    // handleCertificationsUpload(files: FileImage[]) {
    //     this.addBuyingRequestForm.patchValue({
    //         certification: files[0].imageFile,
    //     })
    // }
    // handleCertificationsRemove(files: FileImage[]) {
    //     this.addBuyingRequestForm.patchValue({
    //         certification: files.map((file) => file.imageFile),
    //     })
    // }

    handleOnCategoryChange() {
        // Bind Products by Category
        this.productService
            .getProductsByCategory(this.subCategorySelected)
            .subscribe((result: any) => {
                this.products = result.data
            })

        this.productSelected = -1
    }

    handleOnChooseParent() {
        this.categoryService
            .getCategoriesByParentId(this.categorySelected)
            .subscribe((result: any) => {
                this.subCategories = result.data
            })
        this.productService
            .getProductsByCategory(this.categorySelected)
            .subscribe((result: any) => {
                this.products = result.data
            })

        this.subCategorySelected = -1
        this.productSelected = -1
    }

    onSubmit(requestProduct) {
        this.submitted = true
        // Tags
        let tagResult: string[] = []
        this.tagNames.forEach((element) => {
            tagResult.push(element.value)
        })

        let coverageResult: string[] = []
        this.tagCoverage.forEach((element) => {
            coverageResult.push(element.value)
        })

        let agentsResult: string[] = []
        this.agents.forEach((element) => {
            agentsResult.push(element.value)
        })
        this.buyingRequestService
            .createBuyingRequest(requestProduct)
            .subscribe((result: any) => {
                if (result.isSucceeded) {
                    this.router.navigate(['/account/owner'])
                } else {
                    this.toastr.error(result.errors)
                }
            })
    }

    selectProductSelectHandler(event: any) {
        this.productSelected = event.target.value
    }
}
