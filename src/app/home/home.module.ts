import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeLayoutComponent } from "./home-layout/home-layout.component";
import { HomeMainComponent } from "./home-main/home-main.component";
import { SharedModule } from "../shared/shared.module";
import { HomeHeaderComponent } from './home-layout/home-header/home-header.component';
import { HomeFooterComponent } from './home-layout/home-footer/home-footer.component';

@NgModule({
  declarations: [HomeLayoutComponent, HomeMainComponent, HomeHeaderComponent, HomeFooterComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule]
})
export class HomeModule {}
