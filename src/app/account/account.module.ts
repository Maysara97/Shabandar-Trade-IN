import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AccountRoutingModule } from './account-routing.module'
import { RegisterationComponent } from './components/registeration/registeration.component'
import { LoginComponent } from './components/login/login.component'
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms'

import { EditprofileComponent } from './components/editprofile/editprofile.component'
import { UpdatePasswordComponent } from './components/update-password/update-password.component'

@NgModule({
    declarations: [
        RegisterationComponent,
        LoginComponent,
        EditprofileComponent,
        UpdatePasswordComponent,
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class AccountModule {}
