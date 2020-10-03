import { Component, OnInit } from '@angular/core'
import { MessageService } from 'src/app/messageing/services/message.service'
import { PageEvent } from '@angular/material/paginator'
import { Message } from '../models/message'

@Component({
    selector: 'app-outbox',
    templateUrl: './outbox.component.html',
    styleUrls: ['./outbox.component.scss'],
})
export class OutboxComponent implements OnInit {
    page: number = 1
    pageNumber = 1
    pageSize = 4
    totalCount = 0
    pageEvent: PageEvent
    pageSizeOptions: number[] = [4, 8, 12]
    outboxMessages: Message[] = []
    constructor(private messageService: MessageService) {}

    ngOnInit(): void {
        this.getOutboxes(this.pageSize, this.pageNumber)
    }
    handleOnPageChange(pageEvent: PageEvent) {
        this.getOutboxes(pageEvent.pageSize, pageEvent.pageIndex + 1)
    }
    applyFilter() {
        this.getOutboxes(this.pageSize, this.page)
    }
    getOutboxes(pageSize, pageNumber) {
        this.messageService
            .getAllOutboxMessages(pageSize, pageNumber)
            .subscribe((res: any) => {
                if (res.isSucceeded) {
                    this.outboxMessages = res.data
                    this.totalCount = res.totalRecords
                }
            })
    }

    deleteMessage(messageId) {
        this.messageService
            .deleteMessage(messageId)
            .subscribe((res) =>
                this.getOutboxes(this.pageSize, this.pageNumber)
            )
    }
    archiveMessage(messageId) {
        this.messageService
            .archiveMessage(messageId)
            .subscribe((res) =>
                this.getOutboxes(this.pageSize, this.pageNumber)
            )
    }
}
