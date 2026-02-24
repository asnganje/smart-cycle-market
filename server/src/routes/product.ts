import { Router } from "express";
import { deleteProduct, listNewProduct, updateProduct } from "src/controllers/product";
import { isAuth } from "src/middleware/auth";
import fileParser from "src/middleware/fileParser";
import validate from "src/middleware/validator";
import {
  newProductSchema,
  updateProductSchema,
} from "src/utils/validationSchema";

const productRouter = Router();

productRouter
  .route("/list")
  .post(isAuth, fileParser, validate(newProductSchema), listNewProduct);
productRouter
  .route("/list/:id")
  .patch(isAuth, fileParser, validate(updateProductSchema), updateProduct);
productRouter
  .route("/list/:id")
  .delete(isAuth, deleteProduct)
export default productRouter;
