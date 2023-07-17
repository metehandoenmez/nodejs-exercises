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

async function getResults() {
  try {
    const tina = await luckyDraw("Tina");
    console.log(tina);
    const jorge = await luckyDraw("Jorge");
    console.log(jorge);
    const julien = await luckyDraw("Julien");
    console.log(julien);
  } catch (error) {
    console.error(error.message);
  }
}

getResults();

// If Tina loses the draw, the function immediately catches the error and rest of the  promises are not called.
// How can i fix this?, tried many methods.
