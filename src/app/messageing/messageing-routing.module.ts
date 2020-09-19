import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeLayoutComponent } from '../home/home-layout/home-layout.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { InboxComponent } from './inbox/inbox.component'
import { OutboxComponent } from './outbox/outbox.component'
import { ArchivedComponent } from './archived/archived.component'
import { ViewMessageComponent } from './view-message/view-message.component'
import { NewsComponent } from './news/news.component'

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
                        path: 'news',
                        component: NewsComponent,
                    },
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
                    {
                        path: 'view-message/:threadId',
                        component: ViewMessageComponent,
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
