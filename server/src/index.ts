import express from "express";
import authRouter from "./routes/auth";
import { connectDB } from "./db";
import dotenv from "dotenv"
import formidable from "formidable";
import path from "node:path";
import productRouter from "./routes/product";

dotenv.config()
const app = express();
app.use(express.json());
app.use(express.static("src/public"))

// reading content from a form
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/products", productRouter);

app.post("/auth/upload-file", async (req,res)=> {
  const form = formidable({
    uploadDir:path.join(__dirname, "/public"),
    filename(name, ext, part, form) {    
      return Date.now()+"_"+part.originalFilename
    }
  })

  await form.parse(req)
  res.send("ok")

})

app.use(function(err, req, res, next){
  res.status(500).json({message: err.message})
} as express.ErrorRequestHandler)

const port = 3000;
const uri = process.env.URI

const start = async(dbUri: string | undefined) : Promise<void> => {
  try {
    if (!dbUri) {
      throw new Error("MongoDB URI is missing!")
    }
    await connectDB(dbUri)
    app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
  } catch (error) {
    console.log("Server could not boot up...");
  }
}

start(uri)
