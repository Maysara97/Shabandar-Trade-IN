import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '../home/home-layout/home-layout.component';
import { HomeMainComponent } from '../home/home-main/home-main.component';
import { Egypt2030Component } from '../home/home-main/egypt2030/egypt2030.component';
import { HomeReadMoreComponent } from '../home/home-read-more/home-read-more.component';

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
        path: 'egypt2030',
        component: Egypt2030Component
      },
      {
        path: 'home-read-more',
        component: HomeReadMoreComponent
      },
      {
        path: 'home-main',
        component: HomeMainComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
