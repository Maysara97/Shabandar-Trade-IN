import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeLayoutComponent } from '../home/home-layout/home-layout.component'
import { EditprofileComponent } from '../account/components/editprofile/editprofile.component'

const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
    },
    {
        path: 'editProfile',
        component: EditprofileComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ApplicationRoutingModule {}
