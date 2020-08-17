export class Message {
    messageId: string
    senderAccountId: string
    receiverAccountId: string
    title: string
    body: string
    attachments: string[] = []
    status: number
    type: number
    threadId: string
    isFirst: boolean
    senderName: string
    receiverName: string
    totalCount: number
    sentOn: string
    createdOn: string
    createdBy: string
    lastModifiedOn: string
    lastModifiedBy: string
}
