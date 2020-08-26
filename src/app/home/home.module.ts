import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeRoutingModule } from './home-routing.module'
import { HomeLayoutComponent } from './home-layout/home-layout.component'
import { HomeMainComponent } from './home-main/home-main.component'
import { SharedModule } from '../shared/shared.module'
import { HomeHeaderComponent } from './home-layout/home-header/home-header.component'
import { HomeFooterComponent } from './home-layout/home-footer/home-footer.component'
import { SliderComponent } from './home-main/slider/slider.component'
import { SignupComponent } from './home-main/signup/signup.component'
import { CategoriesComponent } from './home-main/categories/categories.component'
import { Egypt2030Component } from './home-main/egypt2030/egypt2030.component'
import { ProductsComponent } from './home-main/products/products.component'
import { ContactComponent } from './home-main/contact/contact.component'
import { HomeReadMoreComponent } from './home-read-more/home-read-more.component';
import { CategoryProductsComponent } from './home-main/category-products/category-products.component';
import { ShahbundarServicesComponent } from './home-main/shahbundar-services/shahbundar-services.component';
import { SuppliersComponent } from './home-main/suppliers/suppliers.component'

@NgModule({
    declarations: [
        HomeLayoutComponent,
        HomeMainComponent,
        HomeHeaderComponent,
        HomeFooterComponent,
        SliderComponent,
        SignupComponent,
        CategoriesComponent,
        Egypt2030Component,
        ProductsComponent,
        ContactComponent,
        HomeReadMoreComponent,
        CategoryProductsComponent,
        ShahbundarServicesComponent,
        SuppliersComponent,
    ],
    imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
