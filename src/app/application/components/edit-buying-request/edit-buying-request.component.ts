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
    subCategorySelected

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
    categoryId
    title
    categories: Category[]
    subCategories: Category[]
    products: Product[]
    countries: Country[]
    products$: Observable<Product[]>

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
                // this.subCategorySelected = this.buyingRequestDetails.parentId
                this.unitePriceSelected = this.buyingRequestDetails.unitePrice
                // this.finishedStatusSelected = this.buyingRequestDetails.finishedStatus
                // this.tagNames = this.buyingRequestDetails.brandName
                // this.tagCoverage = this.buyingRequestDetails.coverage
                this.title = this.buyingRequestDetails.title
                this.images = this.buyingRequestDetails.image
                // if (this.certifications[0]) {
                //     this.certifications[0] = this.buyingRequestDetails.certification
                // }

                this.productService
                    .getProductsByCategory(this.buyingRequestDetails.categoryId)
                    .subscribe((result: any) => {
                        this.products = result.data
                    })
            })

        // Bind all Categories
        this.categoryService.getAllParents().subscribe((result: any) => {
            this.categories = result.data
        })

        this.productService.getAllProducts().subscribe((result: any) => {
            this.allProducts = result.data
        })

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
            parentId: [],
            paymentTerms: [],
            image: [],
            // size: [],
            description: [],
            location: [],
            // brandName: [],
            // packing: [],
            // storage: [],
            // productMaterial: [],
            // wieght: [],
            // type: [],
            // grade: [],
            // code: [],
            // moq: [],
            // certification: [],
            // duration: [],
            // accomdationName: [],
            // program: [],
            // space: [],
            // finishedStatus: [],
            // coverage: [],
            // serviceType: [],
            // agentsLocation: [],
            // softwares: [],
            // tripCategory: [],
        })
    }

    // Upload Images
    handleImageUpload(files: FileImage[]) {
        this.editBuyingRequestForm.patchValue({
            image: files.map((file) => file.imageFile),
        })
    }
    handleImageRemove(files: FileImage[]) {
        this.editBuyingRequestForm.patchValue({
            image: files.map((file) => file.imageFile),
        })
    }

    // Upload Certifications
    // handleCertificationsUpload(files: FileImage[]) {
    //     this.editBuyingRequestForm.patchValue({
    //         certification: files[0].imageFile,
    //     })
    // }
    // handleCertificationsRemove(files: FileImage[]) {
    //     this.editBuyingRequestForm.patchValue({
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

        this.buyingRequestService
            .updateBuyingRequest(buyingRequestId, this.images)
            .subscribe((result: any) => {
                if (result.isSucceeded) {
                    this.router.navigate(['/account/owner'])
                } else {
                    this.toastr.error(result.errors)
                }
            })
    }
}
