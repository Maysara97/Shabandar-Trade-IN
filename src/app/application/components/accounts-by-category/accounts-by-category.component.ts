import { Component, OnInit } from '@angular/core'
import { AccountData } from 'src/app/account/models/register'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment'
import { CategoryService } from '../../services/category.service'
import { Category } from '../../models/category'

@Component({
    selector: 'app-accounts-by-category',
    templateUrl: './accounts-by-category.component.html',
    styleUrls: ['./accounts-by-category.component.scss'],
})
export class AccountsByCategoryComponent implements OnInit {
    accountByCategory: AccountData[]
    targetCategoryId
    targetCat: Category
    env: any
    constructor(
        private auth: AuthService,
        private route: ActivatedRoute,
        private categoryService: CategoryService
    ) {
        this.targetCategoryId = route.snapshot.params['categoryId']
        this.env = environment
    }

    ngOnInit(): void {
        this.auth
            .getAccountsByCategoryId(this.targetCategoryId)
            .subscribe((res: any) => {
                this.accountByCategory = res.data
            })
        this.categoryService
            .getCategoryById(this.targetCategoryId)
            .subscribe((res: any) => {
                this.targetCat = res.data
            })
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
