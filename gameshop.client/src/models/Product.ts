interface ProductInfo {
    id: string;
    name: string;
    description: string;
    createdDate: Date | null;
    listPrice: number;
    price: number;
    price50: number;
    price100: number;
    companyId: string;
    categoryId: string;
    productTagsIds: string[];
    inventory: number;
    imageFileId: string;
}

interface Product {
    product: ProductInfo;
    imageContentType: string;
    imageData: string;
    key? : string;
}

export type { Product, ProductInfo };