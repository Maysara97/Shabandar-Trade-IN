import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MessageingRoutingModule } from './messageing-routing.module'

import { SidebarComponent } from './sidebar/sidebar.component'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { InboxComponent } from './inbox/inbox.component'
import { OutboxComponent } from './outbox/outbox.component'
import { ArchivedComponent } from './archived/archived.component'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatToolbarModule } from '@angular/material/toolbar'
import { ViewMessageComponent } from './view-message/view-message.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
    declarations: [
        SidebarComponent,
        InboxComponent,
        OutboxComponent,
        ArchivedComponent,
        ViewMessageComponent,
    ],
    imports: [
        CommonModule,
        MessageingRoutingModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatToolbarModule,
        SharedModule,
    ],
})
export class MessageingModule {}
