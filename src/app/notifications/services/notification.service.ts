import { environment } from './../../../environments/environment'
import { Injectable, Injector } from '@angular/core'
import { BaseService } from 'src/app/shared/core/base.service'
import { Notifications } from '../models/notification'
import { Observable, Subject } from 'rxjs'
import * as signalR from '@aspnet/signalr'
import { getToken, log } from 'src/app/shared/helpers/helper'

@Injectable({ providedIn: 'root' })
export class NotificationsService extends BaseService<any> {
    env: any
    constructor(injector: Injector) {
        super(injector)
        this.env = environment
    }
    private connection: signalR.HubConnection
    message = new Subject<NotificationsService>()

    connect() {
        if (this.connection) {
            return
        }
        log('Notification Hub', 'Trying to connect ...')
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(this.env.notification_url, {
                accessTokenFactory: () => getToken(),
            })
            .build()

        this.connection.on(
            'receiveMessage',
            (content: NotificationsService) => {
                log('Notification Hub - Receive', JSON.stringify(content))
                // if (shouldDisplayNotification(content.tags.map((t) => t.value))) {
                // tslint:disable-next-line:align
                this.message.next(content)
                // }
            }
        )

        this.connection
            .start()
            .then(() => log('Notification Hub', 'Connected Successfully'))
            .catch((err) => log('Notification Hub', `Error: ${err}`))
    }

    disconnect() {
        if (this.connection) {
            this.connection.stop()
            this.connection = null
        }
    }

    getAllNotifications(pageSize: number, pageNumber: number) {
        return this.getAll(`Notifications/${pageSize}/${pageNumber}`)
    }
    getNewNotificationsCount(): Observable<any> {
        return this.getAll('Notifications/GetNewNotificationsCount')
    }
    sendNotification(notification: Notifications) {
        return this.post('Notifications/SendNotifiaction', notification)
    }
}
