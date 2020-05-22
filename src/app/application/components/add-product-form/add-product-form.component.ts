import { Component, OnInit } from '@angular/core'
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Product } from '../../models/product'
import { NavigationEnd, Router } from '@angular/router'
import { ProductService } from '../../services/product.service'
import { ToastrService } from 'ngx-toastr'
import { AccountProductService } from '../../services/accountProduct.service'
import { AccountProduct } from '../../models/accountProduct'

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

    tagNames = []
    tagCoverage = []
    agents = []
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private productService: ProductService,
        private toastr: ToastrService,
        private accountProductService: AccountProductService
    ) {}

    ngOnInit(): void {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
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
}
