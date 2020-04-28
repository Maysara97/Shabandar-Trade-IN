import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeLayoutComponent } from '../home/home-layout/home-layout.component'
import { RegisterationComponent } from './components/registeration/registeration.component'
import { HomeMainComponent } from '../home/home-main/home-main.component'
import { LoginComponent } from './components/login/login.component'
import { OwnerComponent } from '../application/components/owner/owner.component'
import { EditprofileComponent } from './components/editprofile/editprofile.component'

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
                children: [
                    { path: 'editprofile', component: EditprofileComponent },
                ],
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountRoutingModule {}
