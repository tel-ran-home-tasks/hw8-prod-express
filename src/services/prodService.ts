import {Product} from "../models/prodTypes.js";


export interface ProdService{
    addProduct(prod:Product):boolean;
    removeProduct(id:number):Product|null;
    findProductById(id:number):Product|null;
    findProductByCategory(cat:string):Product[];
    findProductByBrand(brand:string):Product[];
    findProductWithExpiryDate(date:Date):Product[];
    getAllProducts():Product[];
}