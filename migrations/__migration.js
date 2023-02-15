const fs = require("fs/promises");
require("dotenv").config();

const path = require("path");
const { Pool } = require("pg");

const [_p1, _p2, operation, param, ...rest] = process.argv;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const template = `async function up(pool) {
  try {
    const query = \`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL
    );
    \`;
    const result = await pool.query(query, []);

    console.log(\`________________ \${__filename} _____________________\`);
    console.log(result);

    //
  } catch (error) {
    console.error(\`______________ \${__filename} _____________________\`);
    console.error(error);
    console.error('____________________________________________________');
    throw error;
  }
}

async function down(pool) {
  try {
    const query = 'DROP TABLE IF EXISTS users;';
    const result = await pool.query(query, []);

    console.log(\`________________ \${__filename} _____________________\`);
    console.log(result);

    //
  } catch (error) {
    console.error(\`______________ \${__filename} _____________________\`);
    console.error(error);
    console.error('____________________________________________________');
    throw error;
  }
}

module.exports.up = up;
module.exports.down = down;

`;

const apply = async () => {
  try {
    let files = await fs.readdir(__dirname);
    files = files.sort().filter(filename => !filename.startsWith("__"));

    if (param === "all") {
      for (const filename of files) {
        if (filename.startsWith("__")) {
          continue;
        }
        const migration = require(path.join(__dirname, filename));
        await migration.up(pool);
      }
      return;
    }

    const filename = files[files.length - 1];
    const migration = require(path.join(__dirname, filename));

    if (param === "up") {
      migration.up(pool);
    } else if (param === "down") {
      migration.down(pool);
    }
  } catch (error) {
    console.error(error);
  }
};

const create = async () => {
  try {
    const files = await fs.readdir(__dirname);
    files.sort();

    let filename = `${Date.now()}-${param}`;
    if (rest.length) {
      filename += `-${rest.join("-")}.js`;
    } else {
      filename += ".js";
    }

    await fs.writeFile(path.join(__dirname, filename), template);
  } catch (error) {
    console.error(error);
  }
};

const deleteAll = async () => {
  try {
    const files = await fs.readdir(__dirname);

    const pieces = __filename.split("/");

    for (let filename of files) {
      if (filename !== pieces[pieces.length - 1]) {
        await fs.unlink(path.join(__dirname, filename));
      }
    }
  } catch (error) {
    console.error(error);
  }
};

if (operation === "create") {
  if (param) {
    create();
  }
} else if (operation === "apply") {
  apply();
} else if (operation === "clear") {
  deleteAll();
}
