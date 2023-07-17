# Exercises for NodeJS

You can use **npm start** to test the exercise right away.

> Check other branches for more exercises.

## Exercise:

Create agetResults function that uses async and await. Inside of the function, call the luckyDraw function for each of the players: Tina, Jorge, Julien

Log out the resolved value for each promise and handle any promise rejections.


```
function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
  });
}
```
