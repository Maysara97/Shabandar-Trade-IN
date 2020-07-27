import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { AccountData } from 'src/app/account/models/register'
import { AuthService } from 'src/app/shared/services/auth.service'
import { MessageService } from '../../services/message.service'
import { Router, ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { FileImage } from 'src/app/shared/models/file'

@Component({
    selector: 'app-reply-message',
    templateUrl: './reply-message.component.html',
    styleUrls: ['./reply-message.component.scss'],
})
export class ReplyMessageComponent implements OnInit {
    sendMessageForm: FormGroup
    senderDetails: AccountData
    receiverDetails: AccountData
    isSubmitted = false
    receiverAccountId
    threadId
    receiverName
    title
    senderAccountId
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
        this.threadId = route.snapshot.params['threadId']
        this.receiverName = route.snapshot.params['receiverName']
        this.title = route.snapshot.params['title']
    }

    ngOnInit(): void {
        this.auth.getAccountDetails().subscribe((result: any) => {
            this.senderDetails = result.data
            this.senderAccountId = this.senderDetails.accountId
        })
        this.sendMessageForm = this.fb.group({
            threadId: [],
            senderAccountId: [],
            receiverAccountId: [],
            title: [],
            body: [],
            receiverAccountName: [],
            attachments: [],
        })
    }

    get receiverAccountIdField() {
        return this.sendMessageForm.get('receiverAccountId')
    }

    // Upload Attachments
    handleAttachmentUpload(files: FileImage[]) {
        this.sendMessageForm.patchValue({
            attachments: files[0].imageFile,
        })
    }
    handleAttachmentRemove(files: FileImage[]) {
        this.sendMessageForm.patchValue({
            attachments: files.map((file) => file.imageFile),
        })
    }

    sendMessage(messageForm) {
        this.isSubmitted = true

        this.messageService
            .sendMessage(messageForm)
            .subscribe((result: any) => {
                if (result.isSucceeded) {
                    this.router.navigate(['/messageing/sidebar/outbox'])
                } else {
                    this.toastr.error(result.errors)
                }
            })
    }
}
