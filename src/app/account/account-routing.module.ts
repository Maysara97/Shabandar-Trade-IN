import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '../home/home-layout/home-layout.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { HomeMainComponent } from '../home/home-main/home-main.component';
import { LoginComponent } from './components/login/login.component';
import { OwnerComponent } from '../profile/owner/owner.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: HomeMainComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registeration',
        component: RegisterationComponent
      },
      {
        path: 'owner',
        component: OwnerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
