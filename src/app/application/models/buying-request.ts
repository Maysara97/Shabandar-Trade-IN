export class BuyingRequest {
    // ownerAccountId?: string
    buyingRequestId?: string
    productId?: string
    categoryId?: string
    title?: string
    description?: string
    image?: string
    location?: number
    size?: string
    wieght?: string
    packing?: string
    certification?: string
    type?: string
    grade?: string
    storage?: string
    brandName?: string[] = []
    code?: string
    moq?: string
    paymentTerms?: string
    unitePrice?: number
    price?: string
    duration?: string
    accomdationName?: string
    program?: string
    tripCategory?: string
    space?: string
    finishedStatus?: number
    coverage?: string[] = []
    serviceType?: number
    agentsLocation?: string[] = []
    softwares?: string

    productName?: string
    categoryName?: string
    accountName?: string
    countryName?: string
    accountImage?: string
}
