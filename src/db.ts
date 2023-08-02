import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres@localhost:5432/node");

const setupDb = async () => {
  await db.none(`DROP TABLE IF EXISTS planets;
  CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT
    );

    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
      id SERIAL NOT NULL PRIMARY KEY,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      token TEXT
    )

    `);
  // https://jwt.io for json web tokens
  // but we will use a npm package that will deal with this
  // npm install dotenv --save

  await db.none(`INSERT INTO planets (name) VALUES ('Earth');`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars');`);
  await db.none(
    `INSERT INTO users (username, password) VALUES ('admin', 'dummy');`
  );
};

setupDb();

export { db };
