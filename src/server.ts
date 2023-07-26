import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { Request, Response } from "express";

import dotenv from "dotenv";

dotenv.config();

import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "./controllers/planets.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

//port 3000 was giving constant "already in use" error even though it is not
//tried 3002 and works fine
