import { compare, genSalt, hash } from "bcrypt";
import { Document, Types } from "mongoose";
import { model, Schema } from "mongoose";

interface AuthVerificationDocument extends Document {
  owner: Types.ObjectId,
  token: string,
  createdAt: Date,
  compareToken(token: string): Promise<boolean>
}


const AuthVerificationTokenSchema = new Schema<AuthVerificationDocument>({
  owner:{
    type: Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  token:{
    type: String,
    required: true
  },
  createdAt:{
    type:Date,
    expires:86400,
    default:Date.now()
  }
})

AuthVerificationTokenSchema.pre("save", async function() {
  const salt = await genSalt(10)
  if(this.isModified("token")) {
    this.token = await hash(this.token, salt)
  }
})

AuthVerificationTokenSchema.methods.compareToken = async function(this: AuthVerificationDocument, token:string) {
  const isValid = await compare(token, this.token)
  return isValid 
}

const AuthVerificationTokenModel = model("AuthVerificationToken", AuthVerificationTokenSchema)

export default AuthVerificationTokenModel;