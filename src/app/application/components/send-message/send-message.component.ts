import { Component, OnInit, Inject, Input } from '@angular/core'
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { Message } from '../../models/message'
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
        // public dialogRef: MatDialogRef<SendMessageComponent>,
        // @Inject(MAT_DIALOG_DATA) public messageData: any,
        private fb: FormBuilder,
        private auth: AuthService,
        private messageService: MessageService,
        private router: Router,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ) {
        this.receiverAccountId = route.snapshot.params['receiverAccountId']
        // this.senderAccountId = this.senderDetails.accountId
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

        // if (this.messageData.model) {
        //     this.sendMessageForm.patchValue(this.messageData.model)
        // }
    }
    // onNoClick(): void {
    //     this.dialogRef.close()
    // }

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
