import { Component, OnInit } from '@angular/core'
import { AccountProductService } from '../../services/accountProduct.service'
import { AccountProduct } from '../../models/accountProduct'
import { ActivatedRoute, Router } from '@angular/router'
import { Product } from '../../models/product'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Category } from '../../models/category'
import { Country } from '../../models/country'
import { Observable } from 'rxjs'
import {
    FinishedStatusTypeMapping,
    FinishedStatusType,
} from '../../models/enum'
import { ProductService } from '../../services/product.service'
import { ToastrService } from 'ngx-toastr'
import { CategoryService } from '../../services/category.service'
import { CountryService } from '../../services/country.service'
import { FileImage } from 'src/app/shared/models/file'
import { environment } from 'src/environments/environment'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
    selector: 'app-edit-product-form',
    templateUrl: './edit-product-form.component.html',
    styleUrls: ['./edit-product-form.component.scss'],
})
export class EditProductFormComponent implements OnInit {
    accountProductDetails: AccountProduct
    accountProductId
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
    allProducts: Product
    accountProduct: AccountProduct
    editAccountProductForm: FormGroup
    images: string[] = []
    files: string[] = []
    certifications: string
    tagNames = []
    tagCoverage = []
    agents = []
    env: any

    industryCategorySelected = false
    touristicCategorySelected = false
    realEstateCategorySelected = false
    designersCategorySelected = false
    shippingCategorySelected = false

    decorationId = 'cf762c06-cc14-456b-a0fb-85f071fab5cf'
    designersId = '44fba92f-4cd8-47cb-8ac6-66d6b0a6d9c5'
    shippingId = '7f1cb7ce-f7ee-4683-9cdd-3f080b183326'
    equipmentId = 'b942f13a-5c68-4b3a-a04e-388f1a3d96e6'

    categoryId
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
        private accountProductService: AccountProductService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        private productService: ProductService,
        private toastr: ToastrService,
        private categoryService: CategoryService,
        private countryService: CountryService,
        private authService: AuthService
    ) {
        this.accountProductId = route.snapshot.params['accountProductId']

        this.env = environment
    }

    ngOnInit(): void {
        this.accountProductService
            .getAccountProductById(this.accountProductId)
            .subscribe((result: any) => {
                this.accountProductDetails = result.data
                this.countrySelected = this.accountProductDetails.location
                this.unitePriceSelected = this.accountProductDetails.unitePrice
                this.finishedStatusSelected = this.accountProductDetails.finishedStatus
                this.tagNames = this.accountProductDetails.brandName
                this.tagCoverage = this.accountProductDetails.coverage
                this.images = this.accountProductDetails.productImages
                if (this.accountProductDetails.attachments) {
                    this.files = this.accountProductDetails.attachments
                }
                if (this.accountProductDetails.certification) {
                    this.certifications = this.accountProductDetails.certification
                }
                this.categorySelected = this.accountProductDetails.categoryId
                this.productSelected = this.accountProductDetails.productId
                this.productService
                    .getProductsByCategory(
                        this.accountProductDetails.categoryId
                    )
                    .subscribe((result: any) => {
                        this.products = result.data
                    })
            })

        // Bind all Categories
        this.authService.getAccountCategories().subscribe((result: any) => {
            this.categories = result.data
        })

        this.productService.getAllProducts().subscribe((result: any) => {
            this.allProducts = result.data
        })

        // Bind all Countries
        this.countryService.getAllCountries().subscribe((result: any) => {
            this.countries = result.data
        })

        this.editAccountProductForm = this.formBuilder.group({
            accountProductId: [this.accountProductId],
            productId: [],
            unitePrice: [],
            price: [],
            categoryId: [],
            paymentTerms: [],
            productImages: [],
            attachments: [],
            size: [],
            description: [],
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
        this.editAccountProductForm.patchValue({
            productImages: files.map((file) => file.imageFile),
        })
    }
    handleImageRemove(files: FileImage[]) {
        this.editAccountProductForm.patchValue({
            productImages: files.map((file) => file.imageFile),
        })
    }

    // Upload Files
    handleFileUpload(files: FileImage[]) {
        this.editAccountProductForm.patchValue({
            attachments: files.map((file) => file.imageFile),
        })
    }
    handleFileRemove(files: FileImage[]) {
        this.editAccountProductForm.patchValue({
            attachments: files.map((file) => file.imageFile),
        })
    }
    // Upload Certifications
    handleCertificationsUpload(files: FileImage[]) {
        this.editAccountProductForm.patchValue({
            certification: files[0].imageFile,
        })
    }
    handleCertificationsRemove(files: FileImage[]) {
        this.editAccountProductForm.patchValue({
            certification: files.map((file) => file.imageFile),
        })
    }
    handleOnCategoryChange() {
        // Bind Products by Category
        this.productService
            .getProductsByCategory(this.categorySelected)
            .subscribe((result: any) => {
                this.products = result.data
            })
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

    //     // this.subCategorySelected = -1
    //     // this.productSelected = -1
    // }
    onSubmit(accountProductId) {
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

        this.accountProductService
            .updateAccountProduct(
                accountProductId,
                tagResult,
                this.tagCoverage,
                agentsResult,
                this.images,
                this.files,
                this.certifications
            )
            .subscribe((result: any) => {
                if (result.isSucceeded) {
                    this.router.navigate(['/account/owner'])
                } else {
                    this.toastr.error(result.errors)
                }
            })
    }
    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
