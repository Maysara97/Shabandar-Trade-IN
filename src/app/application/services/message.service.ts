import { BaseService } from 'src/app/shared/core/base.service'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { Message } from '../models/message'

@Injectable({ providedIn: 'root' })
export class MessageService extends BaseService<any> {
    constructor(injector: Injector) {
        super(injector)
    }

    sendMessage(message: Message): Observable<Message> {
        const messageBody = {
            senderAccountId: message.senderAccountId,
            receiverAccountId: message.receiverAccountId,
            title: message.title,
            body: message.body,
            threadId: message.threadId,
            attachments: message.attachments,
        }
        return this.post('Message', messageBody)
    }
    getMessageById(messageId: string) {
        return this.getById('Message', messageId)
    }
    deleteMessage(messageId: string) {
        return this.remove('Message', messageId)
    }
    getThreadMessageById(messageId: string) {
        return this.getById('Message/thread', messageId)
    }
    getArchiveMessageById(messageId: string) {
        return this.getById('Message/archive', messageId)
    }
    restoreMessage(messageId: string) {
        return this.remove('Message/Restore', messageId)
    }
    getAllInboxMessages(pageSize: number, pageNumber: number) {
        return this.getAll(`Message/inbox/${pageSize}/${pageNumber}`)
    }
    getNewInboxMessages(pageSize: number, pageNumber: number) {
        return this.getAll(`Message/inbox/new/${pageSize}/${pageNumber}`)
    }
    getAllOutboxMessages(pageSize: number, pageNumber: number) {
        return this.getAll(`Message/outbox/${pageSize}/${pageNumber}`)
    }
    getAllArchivedMessages(pageSize: number, pageNumber: number) {
        return this.getAll(`Message/archived/${pageSize}/${pageNumber}`)
    }
}
