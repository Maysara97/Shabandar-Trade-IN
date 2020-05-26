import { Role } from './role'

export class User {
    accountId?: string
    accountName?: string
    primaryAdminEmail?: string
    primaryAdminFirstlName?: string
    primaryAdminLastName?: string
    primaryAdminPassword?: string
    accountMobile?: string
    countryId?: 0
    role: Role
    accountImage?: string
}

export class Administrator {
    administratorId?: string
    accountId?: string
    email?: string
    firstName?: string
    lastName?: string
}
