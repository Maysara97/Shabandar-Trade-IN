import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ApplicationRoutingModule } from './application-routing.module'
import { OwnerComponent } from './components/owner/owner.component'
import { ViewerComponent } from './components/viewer/viewer.component'
import { HomepageComponent } from './components/homepage/homepage.component'
import { CarouselModule } from 'ngx-owl-carousel-o'
import { SellProductComponent } from './components/sell-product/sell-product.component'
import { AddProductFormComponent } from './components/add-product-form/add-product-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { TagInputModule } from 'ngx-chips'

@NgModule({
    declarations: [
        OwnerComponent,
        ViewerComponent,
        HomepageComponent,
        SellProductComponent,
        AddProductFormComponent,
    ],
    imports: [
        CommonModule,
        ApplicationRoutingModule,
        CarouselModule,
        ReactiveFormsModule,
        FormsModule,
        TagInputModule,
    ],
})
export class ApplicationModule {}
