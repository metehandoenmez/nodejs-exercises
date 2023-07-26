//database

import { Request, Response } from "express";
import Joi from "joi";

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

function getAll(req: Request, res: Response) {
  res.status(200).json(planets);
  console.log(
    "Planet Names:",
    planets.map((planet) => planet.name)
  );
}

function getOneById(req: Request, res: Response) {
  const { id } = req.params;
  let planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet);
  console.log("Planet Name:", planet);
}

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

function create(req: Request, res: Response) {
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
}

function updateById(req: Request, res: Response) {
  let { id } = req.params;
  let { name } = req.body;

  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  res.status(200).json({ msg: "Success! The planet is updated." });

  console.log(planets);
}

function deleteById(req: Request, res: Response) {
  let { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));

  res.status(200).json({ msg: "Success! The planet is deleted." });
  console.log(planets);
}

export { getAll, getOneById, create, updateById, deleteById };
