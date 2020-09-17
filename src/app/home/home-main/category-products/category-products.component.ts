import { Component, OnInit, Input } from '@angular/core'
import { CategoryService } from 'src/app/application/services/category.service'
import { Category } from 'src/app/application/models/category'
import { environment } from 'src/environments/environment'
import { Ads } from 'src/app/application/models/ads'

@Component({
    selector: 'app-category-products',
    templateUrl: './category-products.component.html',
    styleUrls: ['./category-products.component.scss'],
})
export class CategoryProductsComponent implements OnInit {
    categories: Category[]
    env: any
    counter: number = 0
    adImage: '/assets/images/You-Trade-In/category_1.png'
    constructor(private categoryService: CategoryService) {
        this.env = environment
    }

    ngOnInit(): void {
        this.categoryService.getParentsWithAds().subscribe((result: any) => {
            this.categories = result.data
        })
    }
    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
