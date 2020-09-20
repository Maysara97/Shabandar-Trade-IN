import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MessageService } from 'src/app/messageing/services/message.service'
import { environment } from 'src/environments/environment'
import { Message } from '../models/message'

@Component({
    selector: 'app-view-message',
    templateUrl: './view-message.component.html',
    styleUrls: ['./view-message.component.scss'],
})
export class ViewMessageComponent implements OnInit {
    threadId
    env: any
    messageDetails: Message[]
    constructor(
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
        this.threadId = route.snapshot.params['threadId']
        this.env = environment
    }

    ngOnInit(): void {
        this.messageService
            .getThreadMessageById(this.threadId)
            .subscribe((result: any) => {
                // debugger
                this.messageDetails = result.data
            })
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
