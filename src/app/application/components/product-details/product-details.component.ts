import { Component, OnInit } from '@angular/core'
import { AccountProductService } from '../../services/accountProduct.service'
import { AccountProduct } from '../../models/accountProduct'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import {
    FinishedStatusType,
    FinishedStatusTypeMapping,
} from '../../models/enum'

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
    accountProductDetails: AccountProduct
    accountProductId
    env: any

    public FinishedStatusTypeMapping = FinishedStatusTypeMapping
    // public finishedType = Object.values(FinishedStatusType)
    // public stateTypes = Object.values(FinishedStatusType).filter(
    //     (value) => typeof value === 'number'
    // )
    constructor(
        private accountProductService: AccountProductService,
        private route: ActivatedRoute
    ) {
        this.accountProductId = route.snapshot.params['accountProductId']
        this.env = environment
    }

    ngOnInit(): void {
        this.accountProductService
            .getAccountProductById(this.accountProductId)
            .subscribe((result: any) => {
                // debugger
                this.accountProductDetails = result.data
            })
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}