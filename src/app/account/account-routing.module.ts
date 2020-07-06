import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeLayoutComponent } from '../home/home-layout/home-layout.component'
import { RegisterationComponent } from './components/registeration/registeration.component'
import { HomeMainComponent } from '../home/home-main/home-main.component'
import { LoginComponent } from './components/login/login.component'
import { OwnerComponent } from '../application/components/owner/owner.component'
import { EditprofileComponent } from './components/editprofile/editprofile.component'
import { AuthGuard } from '../shared/guards/auth.guard'
import { HomepageComponent } from '../application/components/homepage/homepage.component'
import { SellProductComponent } from '../application/components/sell-product/sell-product.component'
import { UpdatePasswordComponent } from './components/update-password/update-password.component'
import { ConfirmationComponent } from './components/confirmation/confirmation.component'

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
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'registeration',
                component: RegisterationComponent,
            },
            {
                path: 'owner',
                component: OwnerComponent,
                canActivate: [AuthGuard],
            },
            { path: 'editprofile', component: EditprofileComponent },
            { path: 'update-password', component: UpdatePasswordComponent },
            { path: 'confirmation', component: ConfirmationComponent },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountRoutingModule {}
