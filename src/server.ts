import express from "express";
import "express-async-errors";
import morgan from "morgan";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  createImage,
} from "./controllers/planets.js";
import { logIn, signUp } from "./controllers/users.js";
import multer from "multer"; //in case  of type error use npm i -D @types/multer

import "./passport.js";

const app = express();
const port = 3000;

app.use("/uploads", express.static("uploads")); //or public
//on browser,
//localhost:3000/uploads/earth.jpg
app.use("/static", express.static("static")); //to show files on browser

app.use(morgan("dev"));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

//new route for upload

app.post("/api/planets/:id/image", upload.single("image"), createImage); //upload.single is a middleware, we will have access to middleware inside the createImage fnc on ctrller file

app.post("/api/users/login", logIn);
app.post("/api/users/signup", signUp);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
