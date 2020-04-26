import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AccountRoutingModule } from './account-routing.module'
import { RegisterationComponent } from './components/registeration/registeration.component'
import { LoginComponent } from './components/login/login.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [RegisterationComponent, LoginComponent],
    imports: [CommonModule, AccountRoutingModule, ReactiveFormsModule],
})
export class AccountModule {}
