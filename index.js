import { writeFile } from "node:fs";

let text =
  "This is a sample text to be written to example.txt using node.js core fs method.";

writeFile("example.txt", text, (err) => {
  if (err) throw err;
  else {
    console.log("The file has been written.");
  }
});
