import { Component, OnInit } from '@angular/core'
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Product } from '../../models/product'
import { NavigationEnd, Router } from '@angular/router'
import { ProductService } from '../../services/product.service'
import { ToastrService } from 'ngx-toastr'
import { AccountProductService } from '../../services/accountProduct.service'
import { AccountProduct } from '../../models/accountProduct'
import { CategoryService } from '../../services/category.service'
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

    decorationId = 'cf762c06-cc14-456b-a0fb-85f071fab5cf'
    designersId = '44fba92f-4cd8-47cb-8ac6-66d6b0a6d9c5'
    shippingId = '7f1cb7ce-f7ee-4683-9cdd-3f080b183326'
    equipmentId = 'b942f13a-5c68-4b3a-a04e-388f1a3d96e6'

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

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private productService: ProductService,
        private toastr: ToastrService,
        private accountProductService: AccountProductService,
        private categoryService: CategoryService,
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
        // Bind all Categories
        // this.categoryService.getAllParents().subscribe((result: any) => {
        //     this.categories = result.data
        // })

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
            parentId: [],
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

    // handleOnChooseParent() {
    //     this.categoryService
    //         .getCategoriesByParentId(this.categorySelected)
    //         .subscribe((result: any) => {
    //             this.subCategories = result.data
    //         })
    //     this.productService
    //         .getProductsByCategory(this.categorySelected)
    //         .subscribe((result: any) => {
    //             this.products = result.data
    //         })

    //     this.subCategorySelected = -1
    //     this.productSelected = -1
    // }

    onSubmit(accountProduct) {
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

        // console.log(this.tagCoverage)
        // console.log(this.agents)

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
