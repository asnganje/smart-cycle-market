import { RequestHandler } from "express"
import AuthVerificationTokenModel from "src/models/AuthVerificationToken";
import UserModel from "src/models/User";
import crypto from "crypto"

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
    const token = crypto.randomBytes(36).toString("hex")
    await AuthVerificationTokenModel.create({owner: newUser._id, token})
    const link = `http://localhost:3000/verify?id${newUser._id}&token=${token}`
    res.send(link)
  } catch (error) {
    res.status(401).json({status:"fail", message:"Failed to create a user"})
  }
}

export const login: RequestHandler = (req, res)=> {
  res.json({message: "Auth login route"})
}
