import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AccountRoutingModule } from './account-routing.module'
import { RegisterationComponent } from './components/registeration/registeration.component'
import { LoginComponent } from './components/login/login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { EditprofileComponent } from './components/editprofile/editprofile.component'

@NgModule({
    declarations: [RegisterationComponent, LoginComponent, EditprofileComponent],
    imports: [CommonModule, AccountRoutingModule, ReactiveFormsModule],
})
export class AccountModule {}
