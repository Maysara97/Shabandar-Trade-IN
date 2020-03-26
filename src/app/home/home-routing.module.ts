import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeLayoutComponent } from "./home-layout/home-layout.component";
import { HomeMainComponent } from "./home-main/home-main.component";
import { HomeReadMoreComponent } from "./home-read-more/home-read-more.component";

const routes: Routes = [
  {
    path: "",
    component: HomeLayoutComponent,
    children: [
      {
        path: "",
        component: HomeMainComponent
      },
      {
        path: "home-read-more",
        component: HomeReadMoreComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
