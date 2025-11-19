export interface ProductData {
    Generation?: string;
    Price?: string;
    Capacity?: string;
}

export interface EmployeeDetails{
    id: string,
    name:string,
    data: ProductData | null
}