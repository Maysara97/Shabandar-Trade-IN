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

@Component({
    selector: 'app-add-product-form',
    templateUrl: './add-product-form.component.html',
    styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent implements OnInit {
    categorySelected
    submitted = false
    data = false
    message: string
    product: Product
    accountProduct: AccountProduct
    addProductForm: FormGroup
    images: string[] = []
    files: string[] = []

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
    products: Product[]

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private productService: ProductService,
        private toastr: ToastrService,
        private accountProductService: AccountProductService,
        private categoryService: CategoryService
    ) {}

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

        // Bind all Products
        this.productService.getAllProducts().subscribe((result: any) => {
            this.products = result.data
        })

        this.addProductForm = this.formBuilder.group({
            productId: [null, [Validators.required]],
            unitePrice: [],
            price: [null, [Validators.required]],
            // missed
            // country: [null, [Validators.required]],
            categoryId: [null, [Validators.required]],
            // Both
            paymentTerms: [],
            productImages: [null],
            attachments: [null],
            size: [],
            description: [],
            location: [],
            // Industry Category
            brandName: [],
            // missed
            // productOrigin: [],
            packing: [],
            storage: [],
            // missed
            productMaterial: [],
            wieght: [],
            type: [],
            grade: [],
            code: [],
            moq: [],
            certification: [],
            // Touristic Category
            duration: [],
            accomdationName: [],
            program: [],
            // Real State Category
            space: [],
            finishedStatus: [],
            // Shipping and Logistics Category
            coverage: [],
            serviceType: [],
            agentsLocation: [],
            // Designers Category
            softwares: [],
            tripCategory: [],
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

        console.log(this.tagCoverage)
        console.log(this.agents)

        this.accountProductService
            .createAccountProduct(
                requestProduct,
                tagResult,
                coverageResult,
                agentsResult
            )
            .subscribe((result: any) => {
                if (result) {
                    this.router.navigate(['/account/owner'])
                } else {
                    this.toastr.error('Error')
                }
            })
    }

    categoryChange(value: string) {
        console.log(value)
    }
}
