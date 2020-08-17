export interface ApiResponse {
    isSucceeded: boolean
    errors: any
    data: any
    totalRecords: number
    newNotificationsCount?: number
}
