import { Component, OnInit } from '@angular/core'
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Product } from '../../models/product'
import { NavigationEnd, Router } from '@angular/router'
import { ProductService } from '../../services/product.service'
import { ToastrService } from 'ngx-toastr'

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
    addProductForm: FormGroup

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private productService: ProductService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
        this.addProductForm = this.formBuilder.group({
            accountId: [],
            productName: [null, [Validators.required]],
            productPrice: [null, [Validators.required]],
            country: [null, [Validators.required]],
            category: [null, [Validators.required]],
            // Both
            productPaymentTerms: [],
            productSize: [],
            productDescription: [],
            productLocation: [],
            // Industry Category
            productBrand: [],
            productOrigin: [],
            productPackingWay: [],
            productStorage: [],
            productMaterial: [],
            productWeight: [],
            productGrade: [],
            productCode: [],
            productMOQ: [],
            productCertificate: [],
            // Touristic Category
            productDuration: [],
            productAccomdation: [],
            productProgram: [],
            // Real State Category
            productSpace: [],
            furnishiesState: [],
            finishedOrNot: [],
            // Shipping and Logistics Category
            productCoverage: [],
            serviceType: [],
            productAgentsLocation: [],
            // Designers Category
            productSoftwares: [],
        })
    }

    onSubmit(product: Product) {
        this.submitted = true
        this.productService.createProduct(product).subscribe((result: any) => {
            if (result) {
                this.router.navigate(['/account/owner'])
            } else {
                this.toastr.error('Error')
            }
        })
    }
}
