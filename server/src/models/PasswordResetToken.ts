import { compare, genSalt, hash } from "bcrypt";
import { Document, Types } from "mongoose";
import { model, Schema } from "mongoose";

interface PassResetTokenDocument extends Document {
  owner: Types.ObjectId,
  token: string,
  createdAt: Date,
  compareToken(token: string): Promise<boolean>
}


const PassResetTokenSchema = new Schema<PassResetTokenDocument>({
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
    expires:3600,
    default:Date.now()
  }
})

PassResetTokenSchema.pre("save", async function() {
  const salt = await genSalt(10)
  if(this.isModified("token")) {
    this.token = await hash(this.token, salt)
  }
})

PassResetTokenSchema.methods.compareToken = async function(this: PassResetTokenDocument, token:string) {
  const isValid = await compare(token, this.token)
  return isValid 
}

const PassResetTokenModel = model("PassResetToken", PassResetTokenSchema)

export default PassResetTokenModel;