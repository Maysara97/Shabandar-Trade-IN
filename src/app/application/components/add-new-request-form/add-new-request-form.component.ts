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

@Component({
    selector: 'app-add-new-request-form',
    templateUrl: './add-new-request-form.component.html',
    styleUrls: ['./add-new-request-form.component.scss'],
})
export class AddNewRequestFormComponent implements OnInit {
    categorySelected
    submitted = false
    data = false
    message: string
    products$: Observable<Product[]>
    products: Product[]
    selectedProduct: Product
    addBuyingRequestForm: FormGroup
    allProducts = []
    requestProduct: BuyingRequest
    images: string[] = []
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

    categories: Category[]
    countries: Country[]
    public coverage: Country
    public localFields: Object = { text: 'name', value: 'id' }
    public localWaterMark: string = 'Select Multiple Coverages'

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
        // this.productService.getAllProducts().subscribe((result: any) => {
        //     this.products = result.data
        // })
        // Bind all Countries
        this.countryService.getAllCountries().subscribe((result: any) => {
            this.countries = result.data
        })
        // Bind all Categories
        this.categoryService.getAllCategories().subscribe((result: any) => {
            this.categories = result.data
        })
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
        this.addBuyingRequestForm = this.formBuilder.group({
            productId: [null, [Validators.required]],
            title: [null, [Validators.required]],
            unitePrice: [null],
            image: [null],
            price: [null, [Validators.required]],
            categoryId: [this.categorySelected, [Validators.required]],
            paymentTerms: [],
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

    // Upload Image
    handleImageUpload(files: FileImage[]) {
        this.addBuyingRequestForm.patchValue({
            image: files[0].imageFile,
        })
    }
    handleImageRemove(files: FileImage[]) {
        this.addBuyingRequestForm.patchValue({
            image: files[0].imageFile,
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
            .createBuyingRequest(
                requestProduct,
                tagResult,
                this.tagCoverage,
                agentsResult
            )
            .subscribe((result: any) => {
                if (result.isSucceeded) {
                    this.router.navigate(['/account/owner'])
                } else {
                    this.toastr.error(result.errors)
                }
            })
    }
}
