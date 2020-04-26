import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const SHARED_COMPONENTS = []
const SHARED_EXTERNAL_MODULES = []
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
