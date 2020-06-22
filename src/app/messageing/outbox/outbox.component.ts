import { Component, OnInit } from '@angular/core'

export interface PeriodicElement {
    to: string
    position: number
    subject: string
    message: string
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        position: 1,
        to: 'to',
        subject: 'subject',
        message: 'Lorem ipsum dolor sit amet,',
    },
    {
        position: 2,
        to: 'to',
        subject: 'subject',
        message: 'Lorem ipsum dolor sit amet, ',
    },
]

@Component({
    selector: 'app-outbox',
    templateUrl: './outbox.component.html',
    styleUrls: ['./outbox.component.scss'],
})
export class OutboxComponent implements OnInit {
    displayedColumns: string[] = ['position', 'to', 'subject', 'message']
    dataSource = ELEMENT_DATA
    constructor() {}

    ngOnInit(): void {}
}
