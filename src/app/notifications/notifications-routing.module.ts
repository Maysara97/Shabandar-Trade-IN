import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeLayoutComponent } from '../home/home-layout/home-layout.component'
import { NotificationsComponent } from './components/notifications/notifications.component'

const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                path: 'notifications',
                component: NotificationsComponent,
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NotificationsRoutingModule {}
