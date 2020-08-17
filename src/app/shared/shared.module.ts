import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UploadFilesComponent } from './components/upload-files/upload-files.component'
import { registerPlugin, FilePondModule } from 'ngx-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatBadgeModule } from '@angular/material/badge'
import { NotificationListComponent } from './components/notification-list/notification-list.component'
import { NgxPaginationModule } from 'ngx-pagination'
import { RouterModule } from '@angular/router'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatToolbarModule } from '@angular/material/toolbar'

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview)

const SHARED_COMPONENTS = [UploadFilesComponent, NotificationListComponent]
const SHARED_EXTERNAL_MODULES = [
    FilePondModule,
    MatDialogModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    NgxPaginationModule,
    RouterModule,
    MatPaginatorModule,
    MatToolbarModule,
]
const SHARED_INTERNAL_MODULES = [FormsModule, ReactiveFormsModule]

@NgModule({
    declarations: [...SHARED_COMPONENTS],
    imports: [
        CommonModule,
        ...SHARED_EXTERNAL_MODULES,
        ...SHARED_INTERNAL_MODULES,
    ],
    exports: [
        ...SHARED_EXTERNAL_MODULES,
        ...SHARED_INTERNAL_MODULES,
        ...SHARED_COMPONENTS,
    ],
})
export class SharedModule {}
