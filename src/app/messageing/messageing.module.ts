import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MessageingRoutingModule } from './messageing-routing.module'

import { SidebarComponent } from './sidebar/sidebar.component'
import { AllProductsComponent } from './all-products/all-products.component'
import { AllCategoriesComponent } from './all-categories/all-categories.component'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { InboxComponent } from './inbox/inbox.component';
import { OutboxComponent } from './outbox/outbox.component';
import { ArchivedComponent } from './archived/archived.component'
@NgModule({
    declarations: [
        SidebarComponent,
        AllProductsComponent,
        AllCategoriesComponent,
        InboxComponent,
        OutboxComponent,
        ArchivedComponent,
    ],
    imports: [
        CommonModule,
        MessageingRoutingModule,
        MatTableModule,
        MatIconModule,
    ],
})
export class MessageingModule {}
