import express,{Router} from "express";
import { SupplierController} from "../controllers/supplierController.js";

export const supplierRouter = (controller: SupplierController):Router => {
    const router = express.Router();
    router.get("/", controller.getAll.bind(controller));
    router.get("/query", controller.findByQuery.bind(controller));
    router.get("/:id(\\d+)", controller.getSupplierById.bind(controller));
    router.post("/", controller.addSupplier.bind(controller));
    router.get("/products", controller.getProductsBySupplier.bind(controller));
    return router;
};
