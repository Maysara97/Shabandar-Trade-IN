import { Component, OnInit, Inject, Input } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { AuthService } from 'src/app/shared/services/auth.service'
import { AccountData } from 'src/app/account/models/register'
import { MessageService } from '../../services/message.service'
import { Router, ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
    selector: 'app-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.scss'],
})
export class SendMessageComponent implements OnInit {
    sendMessageForm: FormGroup
    senderDetails: AccountData
    receiverDetails: AccountData
    isSubmitted = false
    receiverAccountId
    senderAccountId
    receiverAccounName
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private messageService: MessageService,
        private router: Router,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ) {
        this.receiverAccountId = route.snapshot.params['receiverAccountId']
    }

    ngOnInit(): void {
        this.auth.getAccountDetails().subscribe((result: any) => {
            this.senderDetails = result.data
            this.senderAccountId = this.senderDetails.accountId
        })
        this.sendMessageForm = this.fb.group({
            senderAccountId: [],
            receiverAccountId: [],
            title: [],
            body: [],
            receiverAccountName: [],
        })

        this.auth
            .getTargetUserProfile(this.receiverAccountId)
            .subscribe((result: any) => {
                this.receiverDetails = result.data
                this.receiverAccounName = this.receiverDetails.accountName
            })
    }

    get receiverAccountIdField() {
        return this.sendMessageForm.get('receiverAccountId')
    }

    sendMessage(messageForm) {
        this.isSubmitted = true

        this.messageService
            .sendMessage(messageForm)
            .subscribe((result: any) => {
                if (result.isSucceeded) {
                    console.log(result.data)
                    this.router.navigate(['/application/sell-product'])
                } else {
                    this.toastr.error(result.errors)
                }
            })
    }
}
