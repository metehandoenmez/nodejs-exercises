// On the terminal:
// -> node
// -> crypto. and hit tab twice to see keys/methods of the crypto module
// -> randomUUID or randomBytes can be used for this exercise
// -> use crypto.randomUUID or crypto.randomBytes(6) to generate a random ID

let crypto = require("crypto");

const randomId = crypto.randomUUID();

console.log(`Your random ID: ${randomId}`);
