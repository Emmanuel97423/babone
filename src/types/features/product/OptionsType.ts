export interface Option {
    id?: string;
    name?:string;
    details:string;
    type:string | undefined;
    options: string[];
    storeId?:string;
   

};