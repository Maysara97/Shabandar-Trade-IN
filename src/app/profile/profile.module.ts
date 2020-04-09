import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { OwnerComponent } from './owner/owner.component';
import { ViewerComponent } from './viewer/viewer.component';


@NgModule({
  declarations: [OwnerComponent, ViewerComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
