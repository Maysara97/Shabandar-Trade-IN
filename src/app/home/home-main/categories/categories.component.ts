import { Category } from './../../../application/models/category'
import { Component, OnInit } from '@angular/core'
import { CategoryService } from 'src/app/application/services/category.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
    categories: Category[]
    env: any

    constructor(private categoryService: CategoryService) {
        this.env = environment
    }

    ngOnInit(): void {
        this.categoryService.getAllParents().subscribe((res: any) => {
            this.categories = res.data
        })
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
