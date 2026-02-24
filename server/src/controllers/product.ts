import { RequestHandler } from "express";
import ProductModel from "src/models/product";
import { sendErrorRes } from "src/utils/helper";
import cloudUploader from "./cloud";
import { UploadApiResponse } from "cloudinary";

const uploadImage = (filepath:string): Promise<UploadApiResponse> => {
  return cloudUploader.upload(filepath, {
    width:1280,
    height:720,
    crop:"fill"
  })
}

export const listNewProduct: RequestHandler = async (req, res) => {
  const { name, category, price, description, purchaseDate } = req.body;

  const newProduct = new ProductModel({
    owner: req.user.id,
    name,
    category,
    price,
    description,
    purchaseDate,
  });

  const { images } = req.files;

  // let isMultipleImages = Array.isArray(images)
  if(Array.isArray(images) && images?.length > 5) {
    return sendErrorRes(res, "Image files cannot be more than 5", 422)
  }
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
  if(Array.isArray(images)) {
    const uploadPromise = images.map((file)=> uploadImage(file.filepath))
    const uploadResults = await Promise.all(uploadPromise)
    newProduct.images = uploadResults.map(({secure_url, public_id})=> {
      return {url: secure_url, id: public_id}
    })
    newProduct.thumbnail = newProduct.images[0].url
  } else {
    if (images) {
      const {secure_url, public_id} = await uploadImage(images.filepath)
      newProduct.images = [{url: secure_url, id: public_id}]
      newProduct.thumbnail = secure_url
    }
  }

  await newProduct.save();
  res.status(201).json({message: "Added a new Product"})
};
