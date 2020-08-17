import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'

import { NotificationsRoutingModule } from './notifications-routing.module'
import { NotificationsComponent } from './components/notifications/notifications.component'

@NgModule({
    declarations: [NotificationsComponent],
    imports: [CommonModule, NotificationsRoutingModule, SharedModule],
})
export class NotificationsModule {}
