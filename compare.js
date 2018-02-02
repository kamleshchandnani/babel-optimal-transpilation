const fs = require("fs");
const Table = require("cli-table2");
// const colors = require("colors");

const files = fs.readdirSync("public/env");

const table = new Table({
  head: ["Example", "Type", "preset-env (Bytes)", "custom (Bytes)", "Difference", "Savings"]
});
const type = {
  "bundle-1.js": { example: 1, type: "Plain React" },
  "bundle-2.js": { example: 2, type: "Arrow Functions" },
  "bundle-3.js": { example: 3, type: "Rest/Spread" },
  "bundle-4.js": { example: 4, type: "async/await" },
  "bundle-5.js": { example: 5, type: "generators" }
};
for (const file of files) {
  if (/\.(js)$/i.test(file)) {
    const env = fs.statSync(`public/env/${file}`).size;
    const custom = fs.statSync(`public/cust/${file}`).size;
    const difference = env - custom;

    // const percentage = parseInt(custom * 100 / env, 10);
    const savings = parseFloat(difference * 100 / env).toFixed(2);
    // table.push([file, env, `${custom} (${percentage}%)`]);
    table.push([
      `${type[file].example}`,
      `${type[file].type}`,
      env,
      custom,
      difference,
      `${savings} %`
    ]);
  }
}

console.log(table.toString());
