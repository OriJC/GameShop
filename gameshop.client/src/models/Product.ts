interface Product {
    id: string;
    name: string;
    description: string;
    createdDate: Date;
    listPrice: number;
    price: number;
    price50: number;
    price100: number;
    companyId: string;
    categoryId: string;
    productTag: string[];
    inventory: number;
    imageFileId: string;
}

export default Product;