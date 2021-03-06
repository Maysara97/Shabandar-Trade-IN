import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { User } from 'src/app/account/models/register'
import { Role } from 'src/app/account/models/role'
import { MatMenuTrigger } from '@angular/material/menu'
import { Observable } from 'rxjs'
import { NotificationsService } from 'src/app/notifications/services/notification.service'
import { Notifications } from 'src/app/notifications/models/notification'
import { MessageService } from 'src/app/messageing/services/message.service'
import { Message } from 'src/app/messageing/models/message'

@Component({
    selector: 'app-home-header',
    templateUrl: './home-header.component.html',
    styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent implements OnInit {
    isLoggedIn
    currentUser: User
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger
    newNotificationCount: number
    newMessageCount = 0
    newNotificationCount$: Observable<number>
    pageSize = 5
    pageNumber = 1
    notifications: Notifications[]
    newMessages: Message[] = []
    // tslint:disable-next-line:variable-name
    constructor(
        public _route: Router,
        private auth: AuthService, 
        private router: Router,
        private notificationService: NotificationsService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.auth.isAuthed.subscribe((result) => {
            this.isLoggedIn = result
        })

        // this.newNotificationCounts()
        // this.newNotificationCount$ = this.notificationService.getNewNotificationsCount()
        this.auth.isAuthed.subscribe((info) => {
            if (info) {
                this.notificationService.connect()
                this.notificationService
                    .getNewNotificationsCount()
                    .subscribe((res: any) => {
                        this.newNotificationCount = res.data
                    })
                this.allNotifications(this.pageSize, this.pageNumber)
            } else {
                this.notificationService.disconnect()
            }
        })
    }
    getNotifications() {
        this.allNotifications(this.pageSize, this.pageNumber)
    }

    hideNav() {
        const x = document.getElementById('mainNav')
        if (x.style.display === 'none') {
            x.style.display = 'block'
        } else {
            x.style.display = 'none'
        }
    }

    public navigateToSection(section: string) {
        window.location.hash = ''
        window.location.hash = section
    }

    openProfile() {
        this._route.navigateByUrl('/account/owner')
    }

    logout() {
        this.auth.logout()
    }

    someMethod() {
        this.trigger.openMenu()
    }

    // newNotificationCounts() {
    //     this.notificationService
    //         .getNewNotificationsCount()
    //         .subscribe((result: any) => {
    //             // debugger
    //             this.newNotificationCount$ = result.data
    //         })
    // }
    getAllNotifications() {
        this.allNotifications(this.pageSize, this.pageNumber)
    }
    allNotifications(pageSize: number, pageNumber: number) {
        this.notificationService
            .getAllNotifications(pageSize, pageNumber)
            .subscribe((result: any) => {
                // debugger
                this.notifications = result.data
            })
    }
    showAllNotifications() {
        this.router.navigateByUrl('/notifications/notifications')
    }

    get sortNotificationsByDate() {
        return this.notifications.sort((a, b) => {
            return <any>new Date(b.createdOn) - <any>new Date(a.createdOn)
        })
    }

    getNewMessage(pageSize, pageNumber) {
        this.messageService
            .getNewInboxMessages(pageSize, pageNumber)
            .subscribe((res: any) => {
                if (res.isSucceeded) {
                    this.newMessages = res.data
                    this.newMessages = res.totalRecords
                    res.totalRecords = 0
                }
            })
    }
}
