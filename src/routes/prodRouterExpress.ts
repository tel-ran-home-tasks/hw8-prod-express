import express, {Router} from "express";
import {ProductControllerExpress} from "../controllers/productControllerExpress.js";


export const productRouter = (controller: ProductControllerExpress): Router => {
    const router = express.Router();

    router.get('/', controller.getAll.bind(controller));
    router.post('/', controller.addProduct.bind(controller));
    router.delete('/', controller.removeProduct.bind(controller));
    router.get('/find', controller.findByQuery.bind(controller));
    router.get('/logs', controller.getLogs.bind(controller));

    return router;
};
