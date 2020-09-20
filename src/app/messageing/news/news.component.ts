import { Component, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { Message } from '../models/message'
import { MessageService } from '../services/message.service'

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
    page: number = 1
    pageNumber = 1
    pageSize = 4
    totalCount = 0
    pageEvent: PageEvent
    pageSizeOptions: number[] = [4, 8, 12]
    newsMessages: Message[] = []
    constructor(private messageService: MessageService) {}

    ngOnInit(): void {
        this.getNewInboxMessages(this.pageSize, this.pageNumber)
    }
    handleOnPageChange(pageEvent: PageEvent) {
        this.getNewInboxMessages(pageEvent.pageSize, pageEvent.pageIndex + 1)
    }
    applyFilter() {
        this.getNewInboxMessages(this.pageSize, this.page)
    }
    getNewInboxMessages(pageSize, pageNumber) {
        this.messageService
            .getNewInboxMessages(pageSize, pageNumber)
            .subscribe((res: any) => {
                if (res.isSucceeded) {
                    this.newsMessages = res.data
                    this.totalCount = res.totalRecords
                }
            })
    }

    deleteMessage(messageId) {
        this.messageService
            .deleteMessage(messageId)
            .subscribe((res) =>
                this.getNewInboxMessages(this.pageSize, this.pageNumber)
            )
    }
    archiveMessage(messageId) {
        this.messageService
            .archiveMessage(messageId)
            .subscribe((res) =>
                this.getNewInboxMessages(this.pageSize, this.pageNumber)
            )
    }
}
