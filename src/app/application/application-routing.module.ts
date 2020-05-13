import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeLayoutComponent } from '../home/home-layout/home-layout.component'
import { EditprofileComponent } from '../account/components/editprofile/editprofile.component'
import { HomepageComponent } from './components/homepage/homepage.component'
import { SellProductComponent } from './components/sell-product/sell-product.component'
import { AddProductFormComponent } from './components/add-product-form/add-product-form.component'
import { ViewerComponent } from './components/viewer/viewer.component'

const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                // Buying Request
                path: 'homepage',
                component: HomepageComponent,
            },
            {
                // Selling Product
                path: 'sell-product',
                component: SellProductComponent,
            },
            {
                // Add new Product Form
                path: 'add-product-form',
                component: AddProductFormComponent,
            },
            {
                path: 'viewer',
                component: ViewerComponent,
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ApplicationRoutingModule {}
