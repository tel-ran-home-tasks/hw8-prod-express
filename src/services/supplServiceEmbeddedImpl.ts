import {Supplier} from "../models/suplTypes.js";
import {ProdService} from "./prodService.js";
import {Product} from "../models/prodTypes.js";


export class SupplierService {
    private suppliers: Supplier[] = [];

    constructor(private productService: ProdService) {
    }

    addSupplier(supplier: Supplier): boolean {
        const exists = this.suppliers.some(s => s.supId === supplier.supId);
        if (exists) {
            console.log(`Supplier with ID ${supplier.supId} already exists`);
            return false;
        }
        const allProductsExist = supplier.products.every(productId => {
            const product = this.productService.findProductById(productId);
            if (!product) {
                console.log(`Product with ID ${productId} not found`);
            }
            return product !== null;
        });
        if (!allProductsExist) {
            console.log(`Not all products exist for supplier ${supplier.supId}`);
            return false;
        }
        this.suppliers.push(supplier);
        console.log(`Added new supplier:`, supplier);
        return true;
    }


    getSupplier(id: number): Supplier | undefined {
        return this.suppliers.find(s => s.supId === id);
    }

    getProductBySupId(id: number): Product[] {
        const supplier = this.getSupplier(id);
        if (!supplier) return [];
        return supplier.products.map(pId => this.productService.findProductById(pId)).filter((p): p is Product => p !== null)
    }

    getAllSuppliers(): Supplier[] {
        return [...this.suppliers];
    }
}