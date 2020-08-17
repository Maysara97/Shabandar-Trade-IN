import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Notifications } from '../../models/notification'
import { NotificationsService } from '../../services/notification.service'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
    notifications: Notifications[]
    totalItems$: Observable<number>
    pageSize = 10
    pageNumber = 1
    totalCount = 0
    pageEvent: PageEvent
    pageSizeOptions: number[] = [6, 9, 12, 15]
    constructor(private notificationService: NotificationsService) {}

    ngOnInit(): void {
        this.allNotifications(10, 1)
    }
    allNotifications(pageSize: number, pageNumber: number) {
        this.notificationService
            .getAllNotifications(pageSize, pageNumber)
            .subscribe((result: any) => {
                // debugger
                this.notifications = result.data
            })
    }
    handlePageChanged(pageEvent: PageEvent) {
        this.pageNumber = pageEvent.pageIndex + 1
        this.pageSize = pageEvent.pageSize
        this.allNotifications(this.pageSize, this.pageNumber)
    }
}
