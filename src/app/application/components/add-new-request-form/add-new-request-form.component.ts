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
    products$: Observable<Product[]>
    products: Product[] = []
    selectedProduct: Product
    addRequestForm: FormGroup
    urls = []
    allProducts = []
    requestProduct: BuyingRequest
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private productService: ProductService,
        private toastr: ToastrService,
        private buyingRequestService: BuyingRequestService
    ) {}

    ngOnInit(): void {
        this.productService.getAllProducts().subscribe((data: any) => {
            this.products = data as Product[]
            // this.products$ = data
            console.log(data)
            // debugger
        })
        // this.products$ = this.productService.getAllProducts()
        // debugger
        // this.productService.getAllProducts().pipe(map(res) => {
        //     debugger
        //     this.products$ = res
        //     console.log(this.products$)
        // })

        // this.productService.getAllProducts().pipe(
        //     map((res) => {
        //         debugger
        //         if (res.isSucceeded) {
        //             this.products$ = res.data
        //             debugger
        //         } else {
        //             this.products$ = res.errors
        //         }
        //     })
        // )

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
        this.addRequestForm = this.formBuilder.group({
            // ownerAccountId: [],
            // buyingRequestId: [],
            productId: [null, Validators.required],
            title: [null, Validators.required],
            description: [null, Validators.required],
            images: [],
        })
    }

    getProducts() {
        this.productService.getAllProducts().subscribe((data: any) => {
            this.products$ = data
            console.log(data)
            // debugger
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

    onSubmit(requestProduct) {
        this.submitted = true
        this.buyingRequestService
            .createBuyingRequest(requestProduct)
            .subscribe((result: any) => {
                if (result) {
                    this.router.navigate(['/account/owner'])
                } else {
                    this.toastr.error('Error')
                }
            })
    }
}
