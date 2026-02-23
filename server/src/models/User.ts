import { Document, model, Schema } from "mongoose";
import { hash, genSalt, compare } from "bcrypt";

interface UserDocument extends Document {
  name: string,
  email: string,
  password:string,
  verified: boolean,
  tokens: string[],
  avatar?:{url:string, id:string}
  comparePassword(password: string): Promise<boolean>
}

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true,
    },
    avatar:{
      type: Object,
      url: String,
      id: String
    },
   tokens: [String]
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  const salt = await genSalt(10);
  if (this.isModified("password")) {
    this.password = await hash(this.password, salt);
  }
});

UserSchema.methods.comparePassword = async function ( this: UserDocument,
  password: string
) {
  const isValid = await compare(password, this.password);
  return isValid;
};

const UserModel = model("User", UserSchema);

export default UserModel;
