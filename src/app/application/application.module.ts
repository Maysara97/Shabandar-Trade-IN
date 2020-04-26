import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { OwnerComponent } from './components/owner/owner.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { HomepageComponent } from './components/homepage/homepage.component';


@NgModule({
  declarations: [OwnerComponent, ViewerComponent, HomepageComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
