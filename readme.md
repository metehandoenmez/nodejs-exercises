# Exercises for NodeJS

You can use **npm install** to install the dependencies and **npm run dev** to test the exercise right away.

> Check other branches for more exercises.

## Exercise:

# Do

> Write a router with the following routes:

1. **GET /api/planets:** return all planets (JSON) with **200**
2. **GET /api/planets/:id:** return a planet (JSON) by id with **200**
3. **POST /api/planets:** create a planet, return only **201** code and a success JSON with key **msg**.
4. 1. Make sure every planet is created with **id** and **name**.
5. **PUT /api/planets/:id:** update a planet by id, return only **200** code and a success JSON with key msg
6. **DELETE /api/planets/:id:** delete a planet by id, return only **200** code and a success JSON with key **msg**.

   > Validate planet fields where appropriate.

# Use

1. The dummy database of planets from the previous exercise.
2. **joi** library for validation.

# Check

1. Use Postman to test the routes.
2. Paths **POST** and **PUT** should receive data in JSON format (**req.body**).
