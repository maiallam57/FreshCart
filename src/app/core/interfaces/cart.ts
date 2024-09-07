export interface Cart {
    status: string
    numOfCartItems: number
    data: Data
}

export interface Data {
    cartOwner: string
    products: Product[]
    totalCartPrice: number
}

export interface Product {
    count: number
    _id: string
    product: ProductInfo
    price: number
}

export interface ProductInfo {
    _id: string
    title: string
    quantity: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
}

export interface Category {
    _id: string
    name: string
}

export interface Brand {
    _id: string
    name: string
    image: string
}
