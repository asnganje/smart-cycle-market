import { RequestHandler } from "express";
import ProductModel from "src/models/product";
import { sendErrorRes } from "src/utils/helper";

export const listNewProduct: RequestHandler = async (req, res) => {
  const { name, category, price, description, purchaseDate } = req.body;

  const newProduct = new ProductModel({
    name,
    category,
    price,
    description,
    purchaseDate,
  });

  const { images } = req.files;

  let invalidImageType = false;
  if (Array.isArray(images)) {
    for (let img of images) {
      if (!img.mimetype?.startsWith("image")) {
        invalidImageType = true;
        break;
      }
    }
  } else {
    if (images) {
      if (!images.mimetype?.startsWith("image")) {
        invalidImageType = true;
      }
    }
  }

  if (invalidImageType)
    return sendErrorRes(res, "Invalid type, files must be image type!", 422);

  newProduct.save();
};
