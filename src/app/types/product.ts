export interface Product{
    id:number;
    title:string;
    description:string;
    rating?:number;
    quantity:number;
    price:number;
    tags:[],
    category:'',
    thumbnail:'',
    images:string[]
}