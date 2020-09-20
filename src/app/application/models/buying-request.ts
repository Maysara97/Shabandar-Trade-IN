export class BuyingRequest {
    buyingRequestId?: string
    ownerAccountId?: string
    categoryId?: string
    subCategoryId?: string
    title?: string
    description?: string
    image?: string[] = []
    location?: number
    paymentTerms?: string
    unitePrice?: number
    price?: string
    subCategoryName?: string
    productName?: string
    parentCategoryName?: string
    accountName?: string
    countryName?: string
    accountImage?: string
    status?: number
}
