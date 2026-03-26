import express from "express";
import authRouter from "./routes/auth";
import { connectDB } from "./db";
import dotenv from "dotenv";
import formidable from "formidable";
import path from "node:path";
import productRouter from "./routes/product";
import { sendErrorRes } from "./utils/helper";
import http from "http";
import { Server } from "socket.io";
import { TokenExpiredError, verify } from "jsonwebtoken";
import morgan from "morgan";
import conversationRouter from "./routes/conversation";

dotenv.config();
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  path: "/socket-message",
});

app.use(express.json());
app.use(morgan("dev"))
app.use(express.static("src/public"));

// reading content from a form
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/conversation", conversationRouter);

io.use((socket, next) => {
  const socketReq = socket.handshake.auth as { token: string } | undefined;

  if (!socketReq?.token) {
    return next(new Error("Unauthorized request!"));
  }

  try {
    socket.data.jwtDecode = verify(socketReq.token, process.env.JWT_SECRET!);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new Error("jwt expired"));
    }
    return next(new Error("Invalid token"));
  }

  next();
});

io.on("connection", (socket) => {
  console.log(socket.data);
  
  console.log("User is connected");
});

app.post("/auth/upload-file", async (req, res) => {
  const form = formidable({
    uploadDir: path.join(__dirname, "/public"),
    filename(name, ext, part, form) {
      return Date.now() + "_" + part.originalFilename;
    },
  });

  await form.parse(req);
  res.send("ok");
});

app.use(function (err, req, res, next) {
  res.status(500).json({ message: err.message });
} as express.ErrorRequestHandler);

app.use((req, res) => {
  sendErrorRes(res, "Not found!", 404);
});

const port = 3000;
const uri = process.env.URI;

const start = async (dbUri: string | undefined): Promise<void> => {
  try {
    if (!dbUri) {
      throw new Error("MongoDB URI is missing!");
    }
    await connectDB(dbUri);
    server.listen(port, "0.0.0.0", () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log("Server could not boot up...");
  }
};

start(uri);
