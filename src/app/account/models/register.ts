import { Role } from './role'

export class User {
    accountName?: string
    primaryAdminEmail?: string
    primaryAdminFirstlName?: string
    primaryAdminLastName?: string
    primaryAdminPassword?: string
    accountMobile?: string
    countryId?: 0
}

export class Administrator {
    administratorId?: string
    accountId?: string
    email?: string
    firstName?: string
    lastName?: string
    emailConfirmed?: string
}

export class AccountData {
    accountId?: string
    accountName?: string
    accountMobile?: string
    countryId?: 0
    countryName?: string
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
    favorites?: Favorites[] = []
}

export class Favorites {
    favoriteId: string
    favoriteAccountId: string
    favoriteItemId: string
    accountName: string
    accountImage: string
    favoriteItemType: number
    categoryName: string
}
