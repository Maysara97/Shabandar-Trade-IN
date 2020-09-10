import { Component, OnInit } from '@angular/core'
import { AccountData } from 'src/app/account/models/register'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-accounts-by-category',
    templateUrl: './accounts-by-category.component.html',
    styleUrls: ['./accounts-by-category.component.scss'],
})
export class AccountsByCategoryComponent implements OnInit {
    accountByCategory: AccountData[]
    targetCategoryId
    env: any
    constructor(private auth: AuthService, private route: ActivatedRoute) {
        this.targetCategoryId = route.snapshot.params['categoryId']
        this.env = environment
    }

    ngOnInit(): void {
        this.auth
            .getAccountsByCategoryId(this.targetCategoryId)
            .subscribe((res: any) => {
                this.accountByCategory = res.data
            })
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
