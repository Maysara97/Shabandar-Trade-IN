import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ApplicationRoutingModule } from './application-routing.module'
import { OwnerComponent } from './components/owner/owner.component'
import { ViewerComponent } from './components/viewer/viewer.component'
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
import { SendMessageComponent } from './components/send-message/send-message.component'
import { BuyingRequestComponent } from './components/buying-request/buying-request.component'
import { ReplyMessageComponent } from './components/reply-message/reply-message.component'
import { MoreCompaniesAdsComponent } from './components/more-companies-ads/more-companies-ads.component'
import { AccountsByCategoryComponent } from './components/accounts-by-category/accounts-by-category.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { NotifierModule, NotifierOptions } from 'angular-notifier'

const customNotifier: NotifierOptions = {
    position: {
        horizontal: {
            position: 'middle',
            distance: 12,
        },
        vertical: {
            position: 'top',
            distance: 12,
            gap: 10,
        },
    },
    theme: 'material',
    behaviour: {
        autoHide: 5000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4,
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease',
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50,
        },
        shift: {
            speed: 300,
            easing: 'ease',
        },
        overlap: 150,
    },
}
@NgModule({
    declarations: [
        OwnerComponent,
        ViewerComponent,
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
        BuyingRequestComponent,
        ReplyMessageComponent,
        MoreCompaniesAdsComponent,
        AccountsByCategoryComponent,
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
        MatToolbarModule,
        BsDatepickerModule.forRoot(),
        MatTabsModule,
        MatDialogModule,
        MatTooltipModule,
        NotifierModule.withConfig({
            position: {
                horizontal: {
                    position: 'middle',
                    distance: 12,
                },
                vertical: {
                    position: 'bottom',
                    distance: 12,
                    gap: 10,
                },
            },
            theme: 'material',
            behaviour: {
                autoHide: 5000,
                onClick: false,
                onMouseover: 'pauseAutoHide',
                showDismissButton: true,
                stacking: 4,
            },
            animations: {
                enabled: true,
                show: {
                    preset: 'slide',
                    speed: 300,
                    easing: 'ease',
                },
                hide: {
                    preset: 'fade',
                    speed: 300,
                    easing: 'ease',
                    offset: 50,
                },
                shift: {
                    speed: 300,
                    easing: 'ease',
                },
                overlap: 150,
            },
        }),
    ],
})
export class ApplicationModule {}
