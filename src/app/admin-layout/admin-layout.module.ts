import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminLayoutRoutingModule } from './admin-layout-routing.module'
import { SidebarComponent } from './sidebar/sidebar.component'
import { AllProductsComponent } from './all-products/all-products.component'
import { AllCategoriesComponent } from './all-categories/all-categories.component'
import { MatTableModule } from '@angular/material/table'

@NgModule({
    declarations: [
        SidebarComponent,
        AllProductsComponent,
        AllCategoriesComponent,
    ],
    imports: [CommonModule, AdminLayoutRoutingModule, MatTableModule],
})
export class AdminLayoutModule {}
