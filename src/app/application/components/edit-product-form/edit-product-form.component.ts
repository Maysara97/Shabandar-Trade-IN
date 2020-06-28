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

    submitted = false
    data = false
    message: string
    product: Product
    allProducts: Product
    accountProduct: AccountProduct
    editAccountProductForm: FormGroup
    images: string[] = []
    files: string[] = []
    certifications: string[] = []
    tagNames = []
    tagCoverage = []
    agents = []

    industryCategorySelected = false
    touristicCategorySelected = false
    realEstateCategorySelected = false
    designersCategorySelected = false
    shippingCategorySelected = false

    realStateId = '5a1bfc74-813f-436a-b919-c24c895cfd81'
    touristicId = '5a1bfc74-813f-436a-b919-c24c895cfd82'
    industryId = '5a1bfc74-813f-436a-b919-c24c895cfd87'
    designersId = '5a1bfc74-813f-436a-b919-c24c895cfd89'
    shippingId = '5a1bfc74-813f-436a-b919-c24c895cfd80'

    categoryId
    categories: Category[]
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
        private countryService: CountryService
    ) {
        this.accountProductId = route.snapshot.params['accountProductId']
    }

    ngOnInit(): void {
        this.accountProductService
            .getAccountProductById(this.accountProductId)
            .subscribe((result: any) => {
                this.accountProductDetails = result.data

                this.categorySelected = this.accountProductDetails.categoryId
                this.countrySelected = this.accountProductDetails.location
                this.unitePriceSelected = this.accountProductDetails.unitePrice
                this.finishedStatusSelected = this.accountProductDetails.finishedStatus
                this.tagNames = this.accountProductDetails.brandName
                this.tagCoverage = this.accountProductDetails.coverage

                this.productService
                    .getProductsByCategory(
                        this.accountProductDetails.categoryId
                    )
                    .subscribe((result: any) => {
                        this.products = result.data
                    })
            })

        // Bind all Categories
        this.categoryService.getAllCategories().subscribe((result: any) => {
            this.categories = result.data
        })

        this.productService.getAllProducts().subscribe((result: any) => {
            this.allProducts = result.data
        })

        // this.categorySelected = -1
        // this.productSelected = -1
        // this.countrySelected = -1
        // this.unitePriceSelected = -1
        // this.finishedStatusSelected = -1

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
    }
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

        console.log(this.tagCoverage)
        console.log(this.agents)

        this.accountProductService
            .updateAccountProduct(
                accountProductId,
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
