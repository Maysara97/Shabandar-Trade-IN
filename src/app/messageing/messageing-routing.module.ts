import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeLayoutComponent } from '../home/home-layout/home-layout.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { InboxComponent } from './inbox/inbox.component'
import { OutboxComponent } from './outbox/outbox.component'
import { ArchivedComponent } from './archived/archived.component'

const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                path: 'sidebar',
                component: SidebarComponent,
                children: [
                    {
                        path: 'inbox',
                        component: InboxComponent,
                    },
                    {
                        path: 'outbox',
                        component: OutboxComponent,
                    },
                    {
                        path: 'archived',
                        component: ArchivedComponent,
                    },
                ],
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MessageingRoutingModule {}
