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
