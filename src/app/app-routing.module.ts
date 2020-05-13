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
        path: 'admin-layout',
        loadChildren: () =>
            import('./admin-layout/admin-layout.module').then(
                (m) => m.AdminLayoutModule
            ),
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
