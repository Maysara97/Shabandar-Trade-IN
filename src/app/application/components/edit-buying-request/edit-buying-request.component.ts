import { Component, OnInit } from '@angular/core'
import { AccountProduct } from '../../models/accountProduct'
import { Product } from '../../models/product'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Category } from '../../models/category'
import { Country } from '../../models/country'
import { Observable } from 'rxjs'
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
    countrySelected
    unitePriceSelected
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
                this.subCategorySelected = this.buyingRequestDetails.subCategoryId
                this.unitePriceSelected = this.buyingRequestDetails.unitePrice
                this.title = this.buyingRequestDetails.title
                this.images = this.buyingRequestDetails.image

                this.categoryService
                    .getCategoriesByParentId(
                        this.buyingRequestDetails.categoryId
                    )
                    .subscribe((result: any) => {
                        this.subCategories = result.data
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
            title: [],
            unitePrice: [],
            price: [],
            categoryId: [],
            subCategoryId: [],
            paymentTerms: [],
            image: [],
            description: [],
            location: [],
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

    handleOnChooseParent() {
        this.categoryService
            .getCategoriesByParentId(this.categorySelected)
            .subscribe((result: any) => {
                this.subCategories = result.data
            })
    }
    onSubmit(buyingRequestForm) {
        this.submitted = true

        const images = this.images
        if (!buyingRequestForm.image) {
            buyingRequestForm.image = images
        }
        this.buyingRequestService
            .updateBuyingRequest(buyingRequestForm, buyingRequestForm.image)
            .subscribe((result: any) => {
                if (result.isSucceeded) {
                    this.toastr.success('Your buying request updated successfully')
                    this.router.navigate(['/account/owner'])
                } else {
                    this.toastr.error(result.errors)
                }
            })
    }
}
