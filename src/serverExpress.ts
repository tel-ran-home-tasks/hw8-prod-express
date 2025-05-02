import express from "express";
import {PORT} from "./configurations/productConfig.js";
import {ProductControllerExpress} from "./controllers/productControllerExpress.js";
import {SupplierController} from "./controllers/supplierController.js";
import {ProductServiceEmbeddedImpl} from "./services/prodServiceEmbeddedImpl.js";
import {SupplierService} from "./services/supplServiceEmbeddedImpl.js";
import {productRouter} from "./routes/prodRouterExpress.js";
import {supplierRouter} from "./routes/supplierRouter.js";
import {Request, Response, NextFunction} from "express";

export const launchServerExpress = () => {

    const app = express();

    const productService = new ProductServiceEmbeddedImpl();
    const supplierService = new SupplierService(productService);

    const productController = new ProductControllerExpress(productService);
    const supplierController = new SupplierController(supplierService);

    app.use(express.json());

    app.use("/api/products", productRouter(productController));
    app.use("/api/suppliers", supplierRouter(supplierController));

    app.use("*", (_req: Request, res: Response) => {
        res.status(404).json({error: "Route not found"});
    });

    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
        console.error(err.stack);
        res.status(500).json({error: "Internal Server Error"});
    });

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
};