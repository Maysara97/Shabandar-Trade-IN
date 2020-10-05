import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'account',
        loadChildren: () =>
            import('./account/account.module').then((m) => m.AccountModule),
    },
    {
        path: 'application',
        loadChildren: () =>
            import('./application/application.module').then(
                (m) => m.ApplicationModule
            ),
    },
    {
        path: 'messageing',
        loadChildren: () =>
            import('./messageing/messageing.module').then(
                (m) => m.MessageingModule
            ),
    },
    {
        path: 'notifications',
        loadChildren: () =>
            import('./notifications/notifications.module').then(
                (m) => m.NotificationsModule
            ),
    },
    // {
    //     path: 'contact',
    //     loadChildren: () =>
    //         import('./contact/contact.module').then((m) => m.ContactModule),
    // },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
    exports: [RouterModule],
})
export class AppRoutingModule {}
