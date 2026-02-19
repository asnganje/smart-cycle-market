import { RequestHandler } from "express"
import UserModel from "src/models/User";

export const sign_up: RequestHandler = async (req, res)=> {
  const {name, email, password} = req.body;

  if(!name) return res.status(422).json({message:"Name is missing!"})
  if(!email) return res.status(422).json({message:"Email is missing!"})
  if(!password) return res.status(422).json({message:"Password is missing!"})
  try {
    const existingUser = await UserModel.findOne({email})
    if (existingUser) {
      res.status(401).json({status:"failed", message:"Email already in use!"})
    }
    const newUser = await UserModel.create({name, email, password})
    res.json({status: "success", data: newUser})
  } catch (error) {
    res.status(401).json({status:"fail", message:"Failed to create a user"})
  }
}

export const login: RequestHandler = (req, res)=> {
  res.json({message: "Auth login route"})
}
