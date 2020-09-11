import { Ads } from './ads'

export class Category {
    categoryId: string
    parentId: string
    categoryName: string
    color: string
    image: string
    hasSub: string
    description: string
    icon: string
    ads: Ads[]
}
