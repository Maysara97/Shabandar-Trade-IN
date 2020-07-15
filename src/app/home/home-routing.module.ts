import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeLayoutComponent } from './home-layout/home-layout.component'
import { HomeMainComponent } from './home-main/home-main.component'
import { HomeReadMoreComponent } from './home-read-more/home-read-more.component'
import { Egypt2030Component } from './home-main/egypt2030/egypt2030.component'

const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                path: '',
                component: HomeMainComponent,
            },
            {
                path: 'egypt2030',
                component: Egypt2030Component,
            },
            {
                path: 'home-read-more',
                component: HomeReadMoreComponent,
            },
            {
                path: 'home-main',
                component: HomeMainComponent,
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
