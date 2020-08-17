import { Component, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { MessageService } from '../services/message.service'
import { Message } from '../models/message'

@Component({
    selector: 'app-archived',
    templateUrl: './archived.component.html',
    styleUrls: ['./archived.component.scss'],
})
export class ArchivedComponent implements OnInit {
    page: number = 1
    pageNumber = 1
    pageSize = 4
    totalCount = 0
    pageEvent: PageEvent
    pageSizeOptions: number[] = [4, 8, 12]
    archivedMessage: Message[] = []
    constructor(private messageService: MessageService) {}

    ngOnInit(): void {
        this.getArchives(this.pageSize, this.pageNumber)
    }
    handleOnPageChange(pageEvent: PageEvent) {
        this.getArchives(pageEvent.pageSize, pageEvent.pageIndex + 1)
    }
    applyFilter() {
        this.getArchives(this.pageSize, this.page)
    }
    getArchives(pageSize, pageNumber) {
        this.messageService
            .getAllArchivedMessages(pageSize, pageNumber)
            .subscribe((res: any) => {
                if (res.isSucceeded) {
                    this.archivedMessage = res.data
                    this.totalCount = res.totalRecords
                }
            })
    }

    deleteMessage(messageId) {
        this.messageService
            .deleteMessage(messageId)
            .subscribe((res) =>
                this.getArchives(this.pageSize, this.pageNumber)
            )
    }
    UnArchiveMessage(messageId) {
        this.messageService
            .restoreMessage(messageId)
            .subscribe((res) =>
                this.getArchives(this.pageSize, this.pageNumber)
            )
    }
}
