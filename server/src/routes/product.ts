import { Router } from "express";
import {
  deleteProduct,
  deleteProductImage,
  getLatestProducts,
  getListings,
  getProductByCategory,
  getProductDetail,
  listNewProduct,
  updateProduct,
} from "src/controllers/product";
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
  .route("/:id")
  .patch(isAuth, fileParser, validate(updateProductSchema), updateProduct);
productRouter.route("/:id").delete(isAuth, deleteProduct);
productRouter
  .route("/image/:productId/:imageId")
  .delete(isAuth, deleteProductImage);
productRouter.route("/detail/:id").get(isAuth, getProductDetail);
productRouter.route("/by-category/:category").get(isAuth, getProductByCategory);
productRouter.route("/latest").get(getLatestProducts);
productRouter.route("/listings").get(isAuth, getListings);
export default productRouter;
