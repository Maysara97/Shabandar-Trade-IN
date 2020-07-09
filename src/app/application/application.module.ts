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
import { MatSelectModule } from '@angular/material/select'
import { SharedModule } from '../shared/shared.module'
import { ProductDetailsComponent } from './components/product-details/product-details.component'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns'
import { BuyingProductDetailsComponent } from './components/buying-product-details/buying-product-details.component'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { MatTabsModule } from '@angular/material/tabs'
import { EditProductFormComponent } from './components/edit-product-form/edit-product-form.component'
import { EditBuyingRequestComponent } from './components/edit-buying-request/edit-buying-request.component'
import { ConfirmationSuccessfullComponent } from './components/confirmation-successfull/confirmation-successfull.component'
import { ConfirmationFailedComponent } from './components/confirmation-failed/confirmation-failed.component'
import { MatDialogModule } from '@angular/material/dialog'
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SendMessageComponent } from './components/send-message/send-message.component'

@NgModule({
    declarations: [
        OwnerComponent,
        ViewerComponent,
        HomepageComponent,
        SellProductComponent,
        AddProductFormComponent,
        AddNewRequestFormComponent,
        ProductDetailsComponent,
        BuyingProductDetailsComponent,
        EditProductFormComponent,
        EditBuyingRequestComponent,
        ConfirmationSuccessfullComponent,
        ConfirmationFailedComponent,
        SendMessageComponent,
    ],
    imports: [
        CommonModule,
        ApplicationRoutingModule,
        CarouselModule,
        ReactiveFormsModule,
        FormsModule,
        TagInputModule,
        NgSelectModule,
        MatSelectModule,
        SharedModule,
        MatPaginatorModule,
        MultiSelectAllModule,
        // NgxPaginationModule,
        MatToolbarModule,
        BsDatepickerModule.forRoot(),
        MatTabsModule,
        MatDialogModule,
    ],
})
export class ApplicationModule {}
