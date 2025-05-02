import {ProdService} from "../services/prodService.js";
import {Request, Response} from "express";
import {logger} from "../events/logger.js";

export class ProductControllerExpress {
    constructor(private productServiceExp: ProdService) {
    }

    getAll(req: Request, res: Response): void {
        const products = this.productServiceExp.getAllProducts();
        res.json(products);
    }

    addProduct(req: Request, res: Response): void {
        const product = {...req.body, expDate: new Date(req.body.expDate)};
        const success = this.productServiceExp.addProduct(product);

        if (!success) {
            res.status(400).send("Product with this ID already exists!");
            return;
        }

        logger.log(`Product added:${JSON.stringify(product, null, 2)}`);
        logger.save(`Product added:${JSON.stringify(product, null, 2)}`);
        res.status(201).send();
    }

    removeProduct(req: Request, res: Response): void {
        const id = req.body.id;
        const success = this.productServiceExp.removeProduct(id);

        if (!success) {
            res.status(404).send("Product not found!");
            return;
        }

        logger.log(`Product removed:${id}`);
        logger.save(`Product removed:${id}`);
        res.json({message: "Product removed!", id});
    }

    findByQuery(req: Request, res: Response): void {
        const {id, category, brand, expDate} = req.query;
        let result;

        if (id) {
            result = this.productServiceExp.findProductById(Number(id));
        } else if (category) {
            result = this.productServiceExp.findProductByCategory(String(category));
        } else if (brand) {
            result = this.productServiceExp.findProductByBrand(String(brand));
        } else if (expDate) {
            const date = new Date(String(expDate));
            if (isNaN(date.getTime())) {
                res.status(400).send("Invalid date");
                return;
            }
            result = this.productServiceExp.findProductWithExpiryDate(date);
        } else {
            res.status(400).send("Not valid query");
            return;
        }

        if (!result || (Array.isArray(result) && result.length === 0)) {
            res.status(404).send("No matches found");
            return;
        }

        res.json(result);
    }

    getLogs(req: Request, res: Response): void {
        res.json(logger.getLogArray());
    }
}