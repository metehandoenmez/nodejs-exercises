import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { Request, Response } from "express";

import dotenv from "dotenv";
import Joi from "joi";
import { request } from "http";
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

app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
  console.log(
    "Planet Names:",
    planets.map((planet) => planet.name)
  );
});

app.get("/api/planets/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  let planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet);
  console.log("Planet Name:", planet);
});

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

app.post("/api/planets", (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newPlanet: Planet = { id, name };

  const validatedNewPlanet = planetSchema.validate(newPlanet);

  if (validatedNewPlanet.error) {
    res.status(400);
    res.json({ msg: validatedNewPlanet.error });
  } else {
    planets = [...planets, newPlanet];
    res.status(201);
    res.json({ msg: "The planet was created." });
  }

  console.log(planets);
});

app.put("/api/planets/:id", (req: Request, res: Response) => {
  let { id } = req.params;
  let { name } = req.body;

  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  res.status(200).json({ msg: "Success! The planet is updated." });

  console.log(planets);
});

app.delete("/api/planets/:id", (req: Request, res: Response) => {
  let { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));

  res.status(200).json({ msg: "Success! The planet is deleted." });
  console.log(planets);
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

//port 3000 was giving constant "already in use" error even though it is not
//tried 3002 and works fine
