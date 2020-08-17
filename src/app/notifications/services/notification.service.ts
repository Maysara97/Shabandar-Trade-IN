import { Injectable, Injector } from '@angular/core'
import { BaseService } from 'src/app/shared/core/base.service'
import { Notifications } from '../models/notification'
import { Observable } from 'rxjs'
import { ApiResponse } from 'src/app/shared/models/api-response'
import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class NotificationsService extends BaseService<any> {
    constructor(injector: Injector) {
        super(injector)
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
