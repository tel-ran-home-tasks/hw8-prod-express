import {Product} from "../models/prodTypes.js";
import {ProdService} from "./prodService.js";


export class ProductServiceEmbeddedImpl implements ProdService {
    private products: Product[] = [
        {
            id: 1,
            title: "Milk",
            category: "Milky",
            brand: "SuperMilk",
            price: 90,
            expDate: new Date("2025-01-01")
        }
    ];

    addProduct(prod: Product): boolean {
        if (this.products.find(p => p.id === prod.id)) return false;
        this.products.push(prod);
        return true;
    }

    removeProduct(id: number): Product | null {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return null;
        return this.products.splice(index, 1)[0];
    }

    findProductById(id: number): Product | null {
        return this.products.find(p => p.id === id) || null;
    }

    findProductByCategory(category: string): Product[] {
        return this.products.filter(p => p.category === category);
    }

    findProductByBrand(brand: string): Product[] {
        return this.products.filter(p => p.brand === brand);
    }

    findProductWithExpiryDate(date: Date): Product[] {
        return this.products.filter(p => p.expDate < date);
    }

    getAllProducts(): Product[] {
        return this.products;
    }
}
