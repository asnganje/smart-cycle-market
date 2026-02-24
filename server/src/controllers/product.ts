import { RequestHandler } from "express";
import ProductModel from "src/models/product";
import { sendErrorRes } from "src/utils/helper";
import cloudUploader from "./cloud";
import { UploadApiResponse } from "cloudinary";
import { isValidObjectId } from "mongoose";

const uploadImage = (filepath: string): Promise<UploadApiResponse> => {
  return cloudUploader.upload(filepath, {
    width: 1280,
    height: 720,
    crop: "fill",
  });
};

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
  if (Array.isArray(images) && images?.length > 5) {
    return sendErrorRes(res, "Image files cannot be more than 5", 422);
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
  if (Array.isArray(images)) {
    const uploadPromise = images.map((file) => uploadImage(file.filepath));
    const uploadResults = await Promise.all(uploadPromise);
    newProduct.images = uploadResults.map(({ secure_url, public_id }) => {
      return { url: secure_url, id: public_id };
    });
    newProduct.thumbnail = newProduct.images[0].url;
  } else {
    if (images) {
      const { secure_url, public_id } = await uploadImage(images.filepath);
      newProduct.images = [{ url: secure_url, id: public_id }];
      newProduct.thumbnail = secure_url;
    }
  }

  await newProduct.save();
  res.status(201).json({ message: "Added a new Product" });
};

export const updateProduct: RequestHandler = async (req, res) => {
  const { purchaseDate, name, description, category, price, thumbnail } = req.body;
  const { id: productId } = req.params;
  if (!isValidObjectId(productId))
    return sendErrorRes(res, "Invalid project id!", 422);

  const product = await ProductModel.findOneAndUpdate(
    {
      _id: productId,
      owner: req.user.id,
    } as any,
    {
      purchaseDate,
      name,
      description,
      category,
      price,
    },
    { new: true },
  );

  if (!product) return sendErrorRes(res, "Product not found!", 404);

  if(typeof product.thumbnail === "string") product.thumbnail = thumbnail

  const { images } = req.files;
  
  if (Array.isArray(images) && ((product.images.length + images.length) > 5))
    return sendErrorRes(res, "Image files cannot be more than 5", 422);

  let invalidFileType = false;
  if (Array.isArray(images)) { 
    for(let img of images) {
      if(!img.mimetype?.startsWith("image")){
        invalidFileType = true;
        break;
      }
    }
  } else {
    if(images) {
      if(!images.mimetype?.startsWith("image")) {
        invalidFileType = true
      }
    }
  }

  if (invalidFileType) {
    return sendErrorRes(res, "Invalid file type, files must be image type", 422)    
  }

  if(Array.isArray(images)) {
    const uploadPromise = images.map((file)=>uploadImage(file.filepath))

    const uploadResults = await Promise.all(uploadPromise)

    const newImages = uploadResults.map(({secure_url, public_id})=> {
      return {url: secure_url, id: public_id}
    })
    product.images.push(...newImages)
    product.thumbnail = product.images[0].url
  } else {
    if(images) {
      const {secure_url, public_id} = await uploadImage(images.filepath)
      product.images.push({url: secure_url, id: public_id})
    }
  }

  await product.save()
  res.json({message: "Product updated successfully"})
};
