import { Component, OnInit } from '@angular/core'
import { MessageService } from 'src/app/application/services/message.service'
import { PageEvent } from '@angular/material/paginator'
import { Message } from 'src/app/application/models/message'

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    page: number = 1
    pageNumber = 1
    pageSize = 6
    totalCount = 0
    pageEvent: PageEvent
    pageSizeOptions: number[] = [6, 9, 12, 15]
    newMessages: Message[] = []
    constructor(private messageService: MessageService) {}

    ngOnInit(): void {
        this.getNewMessage(this.pageSize, this.pageNumber)
    }

    getNewMessage(pageSize, pageNumber) {
        this.messageService
            .getNewInboxMessages(pageSize, pageNumber)
            .subscribe((res: any) => {
                if (res.isSucceeded) {
                    this.newMessages = res.data
                    this.totalCount = res.totalRecords
                }
            })
    }
}
