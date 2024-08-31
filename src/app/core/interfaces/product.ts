
import { Category } from "./category"


// export interface Product {
//     results: number
//     metadata: Metadata //for pagination
//     data: Data[]
// }

// export interface Metadata {
//     currentPage: number
//     numberOfPages: number
//     limit: number
//     nextPage: number
// }

export interface Product {
    sold: number
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    priceAfterDiscount?: number
    availableColors?: any[]
}

export interface Subcategory {
    _id: string
    name: string
    slug: string
    category: string
}
export interface Brand {
    _id: string
    name: string
    slug: string
    image: string
}
