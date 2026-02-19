import { RequestHandler } from "express"

export const sign_up: RequestHandler = (req, res)=> {
  const {name, email, password} = req.body;

  if(!name) return res.status(422).json({message:"Name is missing!"})
  if(!email) return res.status(422).json({message:"Email is missing!"})
  if(!password) return res.status(422).json({message:"Password is missing!"})

  res.json({message: "Auth register route"})
}

export const login: RequestHandler = (req, res)=> {
  res.json({message: "Auth login route"})
}
