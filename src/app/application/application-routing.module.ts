import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeLayoutComponent } from '../home/home-layout/home-layout.component'
import { EditprofileComponent } from '../account/components/editprofile/editprofile.component'
import { SellProductComponent } from './components/sell-product/sell-product.component'
import { AddProductFormComponent } from './components/add-product-form/add-product-form.component'
import { ViewerComponent } from './components/viewer/viewer.component'
import { AddNewRequestFormComponent } from './components/add-new-request-form/add-new-request-form.component'
import { ProductDetailsComponent } from './components/product-details/product-details.component'
import { BuyingProductDetailsComponent } from './components/buying-product-details/buying-product-details.component'
import { EditProductFormComponent } from './components/edit-product-form/edit-product-form.component'
import { EditBuyingRequestComponent } from './components/edit-buying-request/edit-buying-request.component'
import { ConfirmationSuccessfullComponent } from './components/confirmation-successfull/confirmation-successfull.component'
import { ConfirmationFailedComponent } from './components/confirmation-failed/confirmation-failed.component'
import { SendMessageComponent } from './components/send-message/send-message.component'
import { BuyingRequestComponent } from './components/buying-request/buying-request.component'
import { ReplyMessageComponent } from './components/reply-message/reply-message.component'
import { MoreCompaniesAdsComponent } from './components/more-companies-ads/more-companies-ads.component'

const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                // Buying Request
                path: 'buying-request',
                component: BuyingRequestComponent,
            },
            {
                // Selling Product
                path: 'sell-product',
                component: SellProductComponent,
            },
            {
                // Add new Product Form
                path: 'add-product-form',
                component: AddProductFormComponent,
            },
            {
                path: 'viewer/:TargetAccountId',
                component: ViewerComponent,
            },
            {
                path: 'add-new-request-form',
                component: AddNewRequestFormComponent,
            },
            {
                path: 'product-details/:accountProductId',
                component: ProductDetailsComponent,
            },
            {
                path: 'buying-product-details/:buyingRequestId',
                component: BuyingProductDetailsComponent,
            },
            {
                path: 'edit-product-form/:accountProductId',
                component: EditProductFormComponent,
            },
            {
                path: 'edit-buying-request/:buyingRequestId',
                component: EditBuyingRequestComponent,
            },
            {
                path: 'confirmation-successfull',
                component: ConfirmationSuccessfullComponent,
            },
            {
                path: 'confirmation-failed',
                component: ConfirmationFailedComponent,
            },
            {
                path: 'send-message/:receiverAccountId/:accountName',
                component: SendMessageComponent,
            },
            {
                path:
                    'reply-message/:threadId/:receiverAccountId/:receiverName/:title',
                component: ReplyMessageComponent,
            },
            {
                path: 'more-companies-ads/:categoryId',
                component: MoreCompaniesAdsComponent,
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ApplicationRoutingModule {}
