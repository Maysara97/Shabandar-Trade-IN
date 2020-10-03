export enum FinishedStatusType {
    Finished = 1,
    Semi = 2,
    UnFinished = 3,
}
// tslint:disable-next-line:align
export const FinishedStatusTypeMapping = {
    [FinishedStatusType.Finished]: 'Finished',
    [FinishedStatusType.Semi]: 'SemiFinished',
    [FinishedStatusType.UnFinished]: 'UnFinished',
}

export enum Status {
    Active = 1,
    Approved = 2,
    PendingApprove = 3,
    Hold = 4,
}
// tslint:disable-next-line:align
export const StatusMapping = {
    [Status.Active]: 'Active',
    [Status.Approved]: 'Approved',
    [Status.PendingApprove]: 'Pending Approve',
    [Status.Hold]: 'Hold',
}

export enum AdsTypes {
    Billboard = 1,
    Sponsers = 2,
    ShowInHome = 3,
    ShowInCategory = 4,
    BuyingRequest = 5,
    OurPartner = 6,
}
export const AdsTypesMapping = {
    [AdsTypes.Billboard]: 'Billboard',
    [AdsTypes.BuyingRequest]: 'Buying Request',
    [AdsTypes.OurPartner]: 'Our Partner',
    [AdsTypes.ShowInCategory]: 'Show In Category',
    [AdsTypes.ShowInHome]: 'Show In Home',
    [AdsTypes.Sponsers]: 'Sponsers',
}

export enum NotificationEntityType {
    Account = 1,
    Message = 2,
    BuyingRequest = 3,
    Product = 4,
}

export enum MessageStatus {
    New = 1,
    Read = 2,
}
