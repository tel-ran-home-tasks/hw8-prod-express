import {SupplierService} from "../services/supplServiceEmbeddedImpl.js";
import {Request,Response} from "express";
import {logger} from "../events/logger.js";


export class SupplierController {
    constructor(private supplierService:SupplierService) {}

    getAll = (req:Request, res:Response) => {
        res.json(this.supplierService.getAllSuppliers())
    }

    getSupplierById (req: Request, res: Response)  {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            console.log("Invalid ID format");
            return res.status(400).send("Invalid Id format");
        }
        const supplier = this.supplierService.getSupplier(id);
        if (!supplier) {
            console.log(`No supplier found with ID ${id}`);
            return res.status(404).send("No supplier found with ID");
        }
        console.log("Found supplier:", supplier);
        res.json(supplier);
    }

    findByQuery = (req: Request, res: Response): void => {
        const { id, name, productId } = req.query;
        let result;

        if (id) {
            result = this.supplierService.getSupplier(Number(id));
        }
        //TODO
        // else if (name) {
        //     result = this.supplierService.findSuppliersByName(String(name));
        // } else if (productId) {
        //     result = this.supplierService.findSuppliersByProductId(Number(productId));
        // } else {
        //     res.status(400).json({ error: "Not valid query. Use id, name or productId" });
        //     return;
        // }

        if (!result || (Array.isArray(result) && result.length === 0)) {
            res.status(404).json({ error: "No suppliers found" });
            return;
        }
        res.json(result);
    };

    addSupplier = (req:Request, res:Response) => {
        const supplier = req.body;
        const success = this.supplierService.addSupplier(supplier)
        if (success) {
            logger.log(`Successfully added supplier:${JSON.stringify(supplier, null, 2)}`);
            logger.save(`Successfully added supplier:${JSON.stringify(supplier, null, 2)}`);
            res.status(200).send("successfully added supplier");
        }else res.status(400).send("Supplier with this ID already exists");
    }

    getProductsBySupplier = (req:Request, res:Response) => {
        const supId= Number(req.query.supId)
        const products = this.supplierService.getProductBySupId(supId)

        if (!products) {
            res.status(404).send("Supplier Not Found");
        }else {
            res.json(products);
        }
    }
}