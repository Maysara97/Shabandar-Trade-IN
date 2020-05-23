import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UploadFilesComponent } from './components/upload-files/upload-files.component'
import { registerPlugin, FilePondModule } from 'ngx-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview)

const SHARED_COMPONENTS = [UploadFilesComponent]
const SHARED_EXTERNAL_MODULES = [FilePondModule]
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
