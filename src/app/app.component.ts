import { NotifierService } from 'angular-notifier'
import { Component, OnInit } from '@angular/core'
import * as $ from 'jquery'
import { NotificationsService } from './notifications/services/notification.service'
import { Observable } from 'rxjs'
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private notifier: NotifierService
    newNotificationCount$: Observable<number>
    type: string
    message: string
    title = 'Shah-bandar-trade-in'

    public constructor(
        notifier: NotifierService,
        public notificationsService: NotificationsService
    ) {
        this.notifier = notifier
    }
    ngOnInit(): void {
        this.notificationsService
            .getNewNotificationsCount()
            .subscribe((result: any) => {
                this.newNotificationCount$ = result.data
                this.notifier.notify(
                    'success',
                    'You are awesome! I mean it!',
                    'THAT_NOTIFICATION_ID'
                )
            })
    }
}
