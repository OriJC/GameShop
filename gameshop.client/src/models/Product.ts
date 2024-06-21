interface Product {
    id: string;
    name: string;
    drescription: string;
    createdDate: Date;
    listPrice: number;
    price: number;
    price50: number;
    price100: number;
    companyId: string;
    categoryId: string;
    ProductTag: string[];
}

export default Product;