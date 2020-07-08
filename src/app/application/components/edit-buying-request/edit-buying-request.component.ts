import { Component, OnInit } from '@angular/core'
import { AccountProduct } from '../../models/accountProduct'
import { Product } from '../../models/product'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Category } from '../../models/category'
import { Country } from '../../models/country'
import { Observable } from 'rxjs'
import {
    FinishedStatusTypeMapping,
    FinishedStatusType,
} from '../../models/enum'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from '../../services/product.service'
import { ToastrService } from 'ngx-toastr'
import { CategoryService } from '../../services/category.service'
import { CountryService } from '../../services/country.service'
import { FileImage } from 'src/app/shared/models/file'
import { BuyingRequest } from '../../models/buying-request'
import { BuyingRequestService } from '../../services/buying-request.service'

@Component({
    selector: 'app-edit-buying-request',
    templateUrl: './edit-buying-request.component.html',
    styleUrls: ['./edit-buying-request.component.scss'],
})
export class EditBuyingRequestComponent implements OnInit {
    buyingRequestDetails: BuyingRequest
    buyingRequestId
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
    editBuyingRequestForm: FormGroup
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
    title
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
        private buyingRequestService: BuyingRequestService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        private productService: ProductService,
        private toastr: ToastrService,
        private categoryService: CategoryService,
        private countryService: CountryService
    ) {
        this.buyingRequestId = route.snapshot.params['buyingRequestId']
    }

    ngOnInit(): void {
        this.buyingRequestService
            .getBuyingRequestById(this.buyingRequestId)
            .subscribe((result: any) => {
                this.buyingRequestDetails = result.data

                this.categorySelected = this.buyingRequestDetails.categoryId
                this.countrySelected = this.buyingRequestDetails.location

                this.unitePriceSelected = this.buyingRequestDetails.unitePrice
                this.finishedStatusSelected = this.buyingRequestDetails.finishedStatus
                this.tagNames = this.buyingRequestDetails.brandName
                this.tagCoverage = this.buyingRequestDetails.coverage
                this.title = this.buyingRequestDetails.title
                this.images[0] = this.buyingRequestDetails.image
                this.certifications[0] = this.buyingRequestDetails.certification

                this.productService
                    .getProductsByCategory(this.buyingRequestDetails.categoryId)
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

        this.editBuyingRequestForm = this.formBuilder.group({
            buyingRequestId: [this.buyingRequestId],
            productId: [],
            title: [],
            productName: [],
            unitePrice: [],
            price: [],
            categoryId: [],
            paymentTerms: [],
            image: [],
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
        this.editBuyingRequestForm.patchValue({
            productImages: files.map((file) => file.imageFile),
        })
    }
    handleImageRemove(files: FileImage[]) {
        this.editBuyingRequestForm.patchValue({
            productImages: files.map((file) => file.imageFile),
        })
    }

    // Upload Certifications
    handleCertificationsUpload(files: FileImage[]) {
        this.editBuyingRequestForm.patchValue({
            certification: files[0].imageFile,
        })
    }
    handleCertificationsRemove(files: FileImage[]) {
        this.editBuyingRequestForm.patchValue({
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
    onSubmit(buyingRequestId) {
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

        this.buyingRequestService
            .updateBuyingRequest(
                buyingRequestId,
                tagResult,
                this.tagCoverage,
                agentsResult,
                this.images,
                this.certifications
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
