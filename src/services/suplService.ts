import {Product} from "../models/prodTypes.js";
import {Supplier} from "../models/suplTypes.js";

export interface SupplierService {
    getSupplier(id: number): Supplier | undefined;
    addSupplier(supplier: Supplier): boolean;
    getProductsBySupplierId(id: number): Product[];
    getAllSuppliers(): Supplier[];
}