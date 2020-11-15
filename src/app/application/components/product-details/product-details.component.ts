import { Component, OnInit, TemplateRef } from '@angular/core'
import { AccountProductService } from '../../services/accountProduct.service'
import { AccountProduct } from '../../models/accountProduct'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import {
    FinishedStatusType,
    FinishedStatusTypeMapping,
} from '../../models/enum'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { AccountData } from 'src/app/account/models/register'
import { AuthService } from 'src/app/shared/services/auth.service'


@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
    accountProductDetails: AccountProduct
    accountProductId
    env: any
    viewImageModal: BsModalRef
    myAccount:AccountData
    accountId

    public FinishedStatusTypeMapping = FinishedStatusTypeMapping

    constructor(
        private accountProductService: AccountProductService,
        private route: ActivatedRoute,
        private modalService: BsModalService,
        private auth: AuthService
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
            this.auth.getAccountDetails()
            .subscribe((result: any) => {
                this.myAccount = result.data
                //accountId
                this.accountId=this.myAccount.accountId
            })
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }

    viewImage(template: TemplateRef<any>) {
        this.viewImageModal = this.modalService.show(template, {
            class: 'modal-lg',
        })
    }
    closeSubDialog(): void {
        this.viewImageModal.hide()
    }
}
