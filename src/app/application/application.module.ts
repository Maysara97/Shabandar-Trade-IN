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
import { AddNewRequestFormComponent } from './components/add-new-request-form/add-new-request-form.component'
import { NgSelectModule } from '@ng-select/ng-select'

@NgModule({
    declarations: [
        OwnerComponent,
        ViewerComponent,
        HomepageComponent,
        SellProductComponent,
        AddProductFormComponent,
        AddNewRequestFormComponent,
    ],
    imports: [
        CommonModule,
        ApplicationRoutingModule,
        CarouselModule,
        ReactiveFormsModule,
        FormsModule,
        TagInputModule,
        NgSelectModule,
    ],
})
export class ApplicationModule {}
