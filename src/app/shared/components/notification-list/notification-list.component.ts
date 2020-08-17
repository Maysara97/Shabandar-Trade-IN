import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
    @Input() notifications: any
    @Input() totalItems: number
    @Input() pageNumber: number
    @Input() pageSize: number
    @Output() handlePageChanged: EventEmitter<number> = new EventEmitter()
    totalCount = 0
    pageEvent: PageEvent
    pageSizeOptions: number[] = [6, 9, 12, 15]
    constructor() {}

    ngOnInit() {}
    pageChanged(pageNumber: number) {
        this.handlePageChanged.emit(pageNumber)
    }
}
