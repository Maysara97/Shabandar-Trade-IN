import { Component, OnInit } from '@angular/core'

export interface PeriodicElement {
    position: number
    categoryName: string
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        position: 1,
        categoryName: 'categoryName',
    },
    {
        position: 2,
        categoryName: 'categoryName',
    },
]

@Component({
    selector: 'app-all-categories',
    templateUrl: './all-categories.component.html',
    styleUrls: ['./all-categories.component.scss'],
})
export class AllCategoriesComponent implements OnInit {
    displayedColumns: string[] = ['position', 'categoryName']
    dataSource = ELEMENT_DATA
    constructor() {}

    ngOnInit(): void {}
}
