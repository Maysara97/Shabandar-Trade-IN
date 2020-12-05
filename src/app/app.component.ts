import { NotifierService } from 'angular-notifier'

import {
    Component,
    HostListener,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core'
import * as $ from 'jquery'
import { NotificationsService } from './notifications/services/notification.service'
import { Observable } from 'rxjs'
import { Notifications } from './notifications/models/notification'
import { AuthService } from './shared/services/auth.service'
import { Meta , Title } from '@angular/platform-browser';
import {Inject, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private notifier: NotifierService
    type: string
    message: string
    notifications: Notifications

    title = 'Shah-bandar-trade-in'
    static isBrowser = new BehaviorSubject<boolean>(null);

    //This Varrible For Checking if the user signed in or not
    isLoggedIn;

    public constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        notifier: NotifierService,
        public notificationsService: NotificationsService,
        private authService: AuthService,
        private meta: Meta,
        private title2: Title
        
    ) {
        AppComponent.isBrowser.next(isPlatformBrowser(platformId));
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

        //This Part Is For Checking If The User Logged in Or Not.
        this.authService.isAuthed.subscribe((result) => {
            this.isLoggedIn = result
        })
    }

}
