import { NotifierService } from 'angular-notifier'
import { Component, OnInit, ViewChild } from '@angular/core'
import * as $ from 'jquery'
import { NotificationsService } from './notifications/services/notification.service'
import { Observable } from 'rxjs'
import { Notifications } from './notifications/models/notification'
import { AuthService } from './shared/services/auth.service'
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
    notifications: Notifications

    title = 'Shah-bandar-trade-in'

    public constructor(
        notifier: NotifierService,
        public notificationsService: NotificationsService,
        private authService: AuthService
    ) {
        this.notifier = notifier
    }
    ngOnInit(): void {
        this.authService.isAuthed.subscribe((info) => {
            if (info) {
                this.notificationsService.connect()
                this.notificationsService.message.subscribe(
                    (msg: NotificationsService) => {
                        this.notifier.notify(
                            'success',
                            'You have a new Notification',
                            'THAT_NOTIFICATION_ID'
                        )
                    }
                )
            } else {
                this.notificationsService.disconnect()
            }
        })
    }
}
