import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeLayoutComponent } from '../home/home-layout/home-layout.component'
import { EditprofileComponent } from '../account/components/editprofile/editprofile.component'
import { HomepageComponent } from './components/homepage/homepage.component'
import { SellProductComponent } from './components/sell-product/sell-product.component'

const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
    },
    // {
    //     path: 'editProfile',
    //     component: EditprofileComponent,
    // },
    // {
    //     path: 'homepage',
    //     component: HomepageComponent,
    // },
    // {
    //     path: 'sell-product',
    //     component: SellProductComponent,
    // },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ApplicationRoutingModule {}
