const { Modifier } = require("../dist");

// Target from root path
const modifier = new Modifier("example/jsonFile.json");

// argv is passed from cli command
modifier.modify((argv) => ({
  name: argv[0],
  username: argv[1],
}));
