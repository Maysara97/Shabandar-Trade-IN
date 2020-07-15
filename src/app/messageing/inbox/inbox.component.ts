import { Component, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { MessageService } from 'src/app/application/services/message.service'
import { Message } from 'src/app/application/models/message'

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
    page: number = 1
    pageNumber = 1
    pageSize = 4
    totalCount = 0
    pageEvent: PageEvent
    pageSizeOptions: number[] = [4]
    inboxMessages: Message[] = []
    constructor(private messageService: MessageService) {}

    ngOnInit(): void {
        this.getInboxes(this.pageSize, this.pageNumber)
    }
    handleOnPageChange(pageEvent: PageEvent) {
        this.getInboxes(pageEvent.pageSize, pageEvent.pageIndex + 1)
    }
    applyFilter() {
        this.getInboxes(this.pageSize, this.page)
    }
    getInboxes(pageSize, pageNumber) {
        this.messageService
            .getAllInboxMessages(pageSize, pageNumber)
            .subscribe((res: any) => {
                if (res.isSucceeded) {
                    this.inboxMessages = res.data
                    this.totalCount = res.totalRecords
                }
            })
    }
}
