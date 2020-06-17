import { Role } from './role'

export class User {
    // accountId?: string
    accountName?: string
    primaryAdminEmail?: string
    primaryAdminFirstlName?: string
    primaryAdminLastName?: string
    primaryAdminPassword?: string
    accountMobile?: string
    countryId?: 0
    // role: Role
    // accountImage?: string
    // mission?: string
    // vission?: string
    // description?: string
    // accountWebsite?: string
    // accountAttachments?: string[] = []
}

export class Administrator {
    administratorId?: string
    accountId?: string
    email?: string
    firstName?: string
    lastName?: string
}

export class Account {
    accountId?: string
    accountName?: string
    accountMobile?: string
    countryId?: 0
    accountImage?: string
    mission?: string
    vission?: string
    description?: string
    accountWebsite?: string
    accountAttachments?: string[] = []
    isFavorite?: boolean
    favoriteId?: string
    status?: number
    accountAdministrators: Administrator[]
}
