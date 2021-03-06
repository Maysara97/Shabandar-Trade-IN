import jwt_decode from 'jwt-decode'
import { AccountData } from 'src/app/account/models/register'
import { NotificationEntityType } from 'src/app/application/models/enum'

const parseJwt = (token: string): AccountData => {
    try {
        return jwt_decode(token) as AccountData
    } catch (e) {
        return null
    }
}
const generateNotificationURL = (
    notificationEntityType: NotificationEntityType,
    id: any
): string => {
    let url = ''
    switch (notificationEntityType) {
        case NotificationEntityType.BuyingRequest: {
            url = `/application/buying-product-details`
            break
        }
        case NotificationEntityType.Product: {
            url = `/application/product-details`
            break
        }
    }
    return url
}

// const shouldDisplayNotification = (notificationTags: string[]): boolean => {
//     const token = localStorage.getItem('authToken')
//     let allow = false
//     if (token) {
//         const adminInfo = parseJwt(token)
//         const accountTags = adminInfo.notificationGroups.split(',')
//         allow = notificationTags.every(
//             (nott) => accountTags.find((actag) => actag === nott) !== undefined
//         )
//         if (allow) {
//             console.log(
//                 `${accountTags.join(
//                     ' '
//                 )} already has all ${notificationTags.join(' ')}`
//             )
//         } else {
//             console.log(
//                 `${accountTags.join(
//                     ' '
//                 )} does not has all ${notificationTags.join(' ')}`
//             )
//         }
//     }

//     return allow
// }

const getToken = (): string => {
    return localStorage.getItem('token')
}

const setToken = (token: string) => {
    localStorage.setItem('token', token)
}

const log = (title: string, data: any) => {
    console.groupCollapsed(title)
    console.log(data)
    console.groupEnd()
}

export { getToken, setToken, parseJwt, log, generateNotificationURL }
