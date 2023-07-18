# Exercises for NodeJS

You can use **npm install** to install the dependencies and **npm run dev** to test the exercise right away.

> Check other branches for more exercises.

## Exercise:

# Do

> Write simple Express server that listens on port 3000 (use dotenv to specify the port)
> Create a dummy "database" of planets using a let variable. (You will use this data in further exercises.)
> Configure your app (app.use()) to:
>
> > accept JSON from the Client
> > log the Client's requests

# Use

> Dummy database with initial data:

```
type Planet = {
id: number,
name: string,
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
express-async-errors
morgan
```
