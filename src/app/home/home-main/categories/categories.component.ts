import { Category } from './../../../application/models/category'
import { Component, OnInit , TemplateRef} from '@angular/core'
import { CategoryService } from 'src/app/application/services/category.service'
import { environment } from 'src/environments/environment'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
    categories: Category[]
    env: any
    subCategories: Category[]
    subCategoryModal: BsModalRef

    constructor(private categoryService: CategoryService,
        private modalService: BsModalService) {
        this.env = environment
    }

    ngOnInit(): void {
        this.categoryService.getAllParents().subscribe((res: any) => {
            this.categories = res.data
        })
    }
    subCategory(template: TemplateRef<any>, categoryId) {
        this.subCategoryModal = this.modalService.show(template, {
            class: 'modal-lg',
        })

        this.categoryService
            .getCategoriesByParentId(categoryId)
            .subscribe((res: any) => {
                this.subCategories = res.data
            })
    }
    closeSubDialog(): void {
        this.subCategoryModal.hide()
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}