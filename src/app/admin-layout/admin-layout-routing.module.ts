import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeLayoutComponent } from '../home/home-layout/home-layout.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { AllProductsComponent } from './all-products/all-products.component'
import { AllCategoriesComponent } from './all-categories/all-categories.component'

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
                        path: 'all-products',
                        component: AllProductsComponent,
                    },
                    {
                        path: 'all-categories',
                        component: AllCategoriesComponent,
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
export class AdminLayoutRoutingModule {}
