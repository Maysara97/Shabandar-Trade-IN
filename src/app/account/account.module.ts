import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AccountRoutingModule } from './account-routing.module'
import { RegisterationComponent } from './components/registeration/registeration.component'
import { LoginComponent } from './components/login/login.component'
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms'

import { EditprofileComponent } from './components/editprofile/editprofile.component'
import { UpdatePasswordComponent } from './components/update-password/update-password.component'
import { SharedModule } from '../shared/shared.module'
import { ConfirmationComponent } from './components/confirmation/confirmation.component'
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns'

@NgModule({
    declarations: [
        RegisterationComponent,
        LoginComponent,
        EditprofileComponent,
        UpdatePasswordComponent,
        ConfirmationComponent,
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        MultiSelectAllModule,
    ],
})
export class AccountModule {}
