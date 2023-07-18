import express from "express";
import "express-async-errors";
import morgan from "morgan";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

//database

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

//port 3000 was giving constant "already in use" error even though it is not
//tried 3002 and works fine
