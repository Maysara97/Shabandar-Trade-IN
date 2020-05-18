import { Component, OnInit } from '@angular/core'
import { Product } from '../../models/product'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, NavigationEnd } from '@angular/router'
import { ProductService } from '../../services/product.service'
import { ToastrService } from 'ngx-toastr'

@Component({
    selector: 'app-add-new-request-form',
    templateUrl: './add-new-request-form.component.html',
    styleUrls: ['./add-new-request-form.component.scss'],
})
export class AddNewRequestFormComponent implements OnInit {
    // categorySelected
    submitted = false
    data = false
    message: string
    product: Product
    addRequestForm: FormGroup
    urls = []

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
        this.addRequestForm = this.formBuilder.group({
            accountId: [],
            buyingRequestId: [],
            productId: [null, Validators.required],
            title: [null, Validators.required],
            description: [null, Validators.required],
            images: [],
        })
    }

    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length
            for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader()

                reader.onload = (event: any) => {
                    console.log(event.target.result)
                    this.urls.push(event.target.result)
                }

                reader.readAsDataURL(event.target.files[i])
            }
        }
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
