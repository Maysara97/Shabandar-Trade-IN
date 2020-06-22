import { Component, OnInit } from '@angular/core'

export interface PeriodicElement {
    productName: string
    position: number
    categoryName: string
    accountName: string
    description: string
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        position: 1,
        productName: 'productName',
        categoryName: 'categoryName',
        accountName: 'accountName',
        description: 'description',
    },
    {
        position: 2,
        productName: 'productName',
        categoryName: 'categoryName',
        accountName: 'accountName',
        description: 'description',
    },
]

@Component({
    selector: 'app-all-products',
    templateUrl: './all-products.component.html',
    styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
    displayedColumns: string[] = [
        'position',
        'productName',
        'categoryName',
        'accountName',
        'description',
        'actions',
    ]
    dataSource = ELEMENT_DATA
    constructor() {}

    ngOnInit(): void {}
}
