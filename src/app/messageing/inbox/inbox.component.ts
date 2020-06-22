import { Component, OnInit } from '@angular/core'

export interface PeriodicElement {
    from: string
    position: number
    subject: string
    message: string
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        position: 1,
        from: 'from',
        subject: 'subject',
        message: 'Lorem ipsum dolor sit amet,',
    },
    {
        position: 2,
        from: 'from',
        subject: 'subject',
        message: 'Lorem ipsum dolor sit amet, ',
    },
]

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
    displayedColumns: string[] = ['position', 'from', 'subject', 'message']
    dataSource = ELEMENT_DATA
    constructor() {}

    ngOnInit(): void {}
}
