interface Category {
    id: string | number;
    key?: string | number; 
    name: string;
    createdDate?: string; 
    [key: string]: any; 
}

export type {Category}