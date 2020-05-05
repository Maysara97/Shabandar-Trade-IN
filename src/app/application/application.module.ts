import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ApplicationRoutingModule } from './application-routing.module'
import { OwnerComponent } from './components/owner/owner.component'
import { ViewerComponent } from './components/viewer/viewer.component'
import { HomepageComponent } from './components/homepage/homepage.component'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SellProductComponent } from './components/sell-product/sell-product.component'

@NgModule({
    declarations: [OwnerComponent, ViewerComponent, HomepageComponent, SellProductComponent],
    imports: [CommonModule, ApplicationRoutingModule, CarouselModule],
})
export class ApplicationModule {}
