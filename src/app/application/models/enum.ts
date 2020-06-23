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
