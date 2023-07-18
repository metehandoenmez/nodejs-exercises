# Exercises for NodeJS

You can use **npm install** to install the dependencies and **npm run dev** to test the exercise right away.

> Check other branches for more exercises.

## Exercise:

# Do

> Add planets Controller (**controllers/planets.ts**) consisting of the following functions:

1. **getAll**
2. **getOneById**
3. **create**
4. **updateById**
5. **deleteById**

> Then, replace callback functions in routes **(req: Request, res: Response) =>** with the functions above. (For example: the route **/api/planets** should use **getAll** function.)

# Use

1. The dummy database of planets from the previous exercise.
2. **Array.prototype.find** higher-order function to Get One.
3. Spread operator (**[...planets]**) to Create.
4. **Array.prototype.map** higher-order function to Update.
5. **Array.prototype.filter** higher-order function to Delete.

# Check

1. Use Postman to test the routes.
