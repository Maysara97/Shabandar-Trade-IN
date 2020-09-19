import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Product } from '../../models/product'
import { NavigationEnd, Router } from '@angular/router'
import { ProductService } from '../../services/product.service'
import { ToastrService } from 'ngx-toastr'
import { AccountProductService } from '../../services/accountProduct.service'
import { AccountProduct } from '../../models/accountProduct'
import { Category } from '../../models/category'
import { FileImage, FilePond } from 'src/app/shared/models/file'
import { Observable } from 'rxjs'
import { CountryService } from '../../services/country.service'
import { Country } from '../../models/country'
import {
    FinishedStatusTypeMapping,
    FinishedStatusType,
} from '../../models/enum'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
    selector: 'app-add-product-form',
    templateUrl: './add-product-form.component.html',
    styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent implements OnInit {
    categorySelected
    productSelected
    countrySelected
    unitePriceSelected
    finishedStatusSelected
    subCategorySelected

    submitted = false
    data = false
    message: string
    product: Product
    accountProduct: AccountProduct
    addProductForm: FormGroup
    images: string[] = []
    files: string[] = []
    certifications: string[] = []
    tagNames = []
    tagCoverage = []
    agents = []
    categories: Category[]
    subCategories: Category[]
    products: Product[]
    countries: Country[]
    products$: Observable<Product[]>
    public coverage: Country
    public localFields: Object = { text: 'name', value: 'id' }
    public localWaterMark: string = 'Select Multiple Coverages'

    public FinishedStatusTypeMapping = FinishedStatusTypeMapping
    public finishedType = Object.values(FinishedStatusType)
    public stateTypes = Object.values(FinishedStatusType).filter(
        (value) => typeof value === 'number'
    )

    moreInformation = false

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private productService: ProductService,
        private toastr: ToastrService,
        private accountProductService: AccountProductService,
        private countryService: CountryService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })

        this.authService.getAccountCategories().subscribe((result: any) => {
            this.categories = result.data
        })

        this.categorySelected = -1
        this.productSelected = -1
        this.countrySelected = -1
        this.unitePriceSelected = -1
        this.finishedStatusSelected = -1
        this.subCategorySelected = -1

        // Bind all Countries
        this.countryService.getAllCountries().subscribe((result: any) => {
            this.countries = result.data
        })
        this.addProductForm = this.formBuilder.group({
            productId: [null, [Validators.required]],
            unitePrice: [],
            price: [null, [Validators.required]],
            categoryId: [null, [Validators.required]],
            paymentTerms: [],
            productImages: [null, [Validators.required]],
            attachments: [null],
            size: [],
            description: [null, [Validators.required]],
            location: [],
            brandName: [],
            packing: [],
            storage: [],
            productMaterial: [],
            wieght: [],
            type: [],
            grade: [],
            code: [],
            moq: [],
            certification: [],
            duration: [],
            accomdationName: [],
            program: [],
            space: [],
            finishedStatus: [],
            coverage: [],
            serviceType: [],
            agentsLocation: [],
            softwares: [],
            tripCategory: [],
            modelYear: [],
            totalHours: [],
            capacity: [],
        })
    }

    // Upload Images
    handleImageUpload(files: FileImage[]) {
        this.addProductForm.patchValue({
            productImages: files.map((file) => file.imageFile),
        })
    }
    handleImageRemove(files: FileImage[]) {
        this.addProductForm.patchValue({
            productImages: files.map((file) => file.imageFile),
        })
    }

    // Upload Files
    handleFileUpload(files: FileImage[]) {
        this.addProductForm.patchValue({
            attachments: files.map((file) => file.imageFile),
        })
    }
    handleFileRemove(files: FileImage[]) {
        this.addProductForm.patchValue({
            attachments: files.map((file) => file.imageFile),
        })
    }
    // Upload Certifications
    handleCertificationsUpload(files: FileImage[]) {
        this.addProductForm.patchValue({
            certification: files[0].imageFile,
        })
    }
    handleCertificationsRemove(files: FileImage[]) {
        this.addProductForm.patchValue({
            certification: files[0].imageFile,
        })
    }
    handleOnCategoryChange() {
        // Bind Products by Category
        this.productService
            .getProductsByCategory(this.categorySelected)
            .subscribe((result: any) => {
                this.products = result.data
            })

        this.productSelected = -1
    }

    toggleMoreInformation() {
        this.moreInformation = !this.moreInformation
    }
    onSubmit(accountProduct) {
        this.submitted = true
        // Tags
        let tagResult: string[] = []
        this.tagNames.forEach((element) => {
            tagResult.push(element.value)
        })

        let coverageResult: string[] = []
        this.tagCoverage.forEach((element) => {
            coverageResult.push(element.text)
        })

        let agentsResult: string[] = []
        this.agents.forEach((element) => {
            agentsResult.push(element.value)
        })

        this.accountProductService
            .createAccountProduct(
                accountProduct,
                tagResult,
                this.tagCoverage,
                agentsResult
            )
            .subscribe((result: any) => {
                if (result.isSucceeded) {
                    console.log(result.data)
                    this.router.navigate(['/account/owner'])
                } else {
                    this.toastr.error(result.errors)
                }
            })
    }
}
