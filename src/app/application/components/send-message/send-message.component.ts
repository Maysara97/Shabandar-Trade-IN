import { Component, OnInit, Inject, Input } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from 'src/app/shared/services/auth.service'
import { AccountData } from 'src/app/account/models/register'
import { MessageService } from '../../../messageing/services/message.service'
import { Router, ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { FileImage } from 'src/app/shared/models/file'
 
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
    threadId
    accountName
    senderAccountId
    receiverAccounName
    attachments: string[] = []

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private messageService: MessageService,
        private router: Router,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ) {
        this.receiverAccountId = route.snapshot.params['receiverAccountId']
        this.accountName = route.snapshot.params['accountName']
    }

    ngOnInit(): void {
        this.auth.getAccountDetails().subscribe((result: any) => {
            this.senderDetails = result.data
            this.senderAccountId = this.senderDetails.accountId
        })
        this.sendMessageForm = this.fb.group({
            senderAccountId: [],
            receiverAccountId: [],
            title: [null, [Validators.required]],
            body: [null, [Validators.required]],
            receiverAccountName: [],
            attachments: [],
        })
    }

    // Upload Attachments
    handleAttachmentUpload(files: FileImage[]) {
        this.sendMessageForm.patchValue({
            attachments: files.map((file) => file.imageFile),
        })
    }
    handleAttachmentRemove(files: FileImage[]) {
        this.sendMessageForm.patchValue({
            attachments: files.map((file) => file.imageFile),
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
                    this.toastr.success("Message sent successfully")
                    this.router.navigate(['/application/sell-product'])
                } else {
                    this.toastr.error(result.errors)
                }
            })
    }
}
