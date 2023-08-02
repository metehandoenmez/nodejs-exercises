//database

import { Request, Response } from "express";
import Joi from "joi";
import pgPromise from "pg-promise";

// type Planet = {
//   id: number;
//   name: string;
// };

// type Planets = Planet[];

// let planets: Planets = [
//   {
//     id: 1,
//     name: "Earth",
//   },
//   {
//     id: 2,
//     name: "Mars",
//   },
// ];

const db = pgPromise()("postgres://postgres@localhost:5432/node");

const setupDb = async () => {
  await db.none(`DROP TABLE IF EXISTS planets;
  CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT);
    `);
  await db.none(`INSERT INTO planets (name) VALUES ('Earth');`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars');`);

  const planets = await db.many(`SELECT * FROM planets;`);
  console.log(planets);
};

setupDb();

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`);
  res.status(200);
  res.json(planets);
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = await db.oneOrNone(
    `SELECT * FROM planets WHERE id=$1;`,
    Number(id)
  );
  res.status(200);
  res.json(planet);
};

const planetSchema = Joi.object({
  // id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

const create = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newPlanet = { name };
  //validate
  const validatedNewPlanet = planetSchema.validate(newPlanet);

  if (validatedNewPlanet.error) {
    res.status(400);
    res.json({ msg: validatedNewPlanet.error });
  } else {
    await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
    res.status(201);
    res.json({ msg: "The planet was created." });
  }
};

const updateById = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;

  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);

  res.status(200);
  res.json({ message: "The planet name was updated." });
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));

  res.status(200).json({ message: "The planet was deleted." });
};

const createImage = async (req: Request, res: Response) => {
  console.log(req.file);
  const { id } = req.params;
  const fileName = req.file?.path;

  if (fileName) {
    db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName]);
    res.status(201).json({ msg: "Planet image uploaded successfully." });
  } else {
    res.status(400).json({ msg: "Failed to upload." });
  }
};

export { getAll, getOneById, create, updateById, deleteById, createImage };
