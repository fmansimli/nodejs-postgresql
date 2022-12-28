const fs = require("fs/promises");
const path = require("path");

const [_p1, _p2, operation, param, ...rest] = process.argv;

const template = `async function up(pool){
  console.log("up!",__filename);
}

async function down(pool){
  console.log("down!",__filename);
}

module.exports.up = up;
module.exports.down = down;

`;

const apply = async () => {
  try {
    const files = await fs.readdir(__dirname);
    files.sort();

    const filename = files[files.length - 1];
    const migration = require(path.join(__dirname, filename));

    if (param === "up") {
      migration.up({});
    } else if (param === "down") {
      migration.down({});
    }
  } catch (error) {
    console.error(error);
  }
};

const create = async () => {
  try {
    const files = await fs.readdir(__dirname);
    files.sort();

    const next = Number(files[files.length - 1][0]) + 1;
    let filename = `${next}-${Date.now()}-${param}`;
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
