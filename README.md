## Argv Json Mapper

- JSON modifier with process argv values. Simple way to modify json file values based on argv passed to script

## Start

```
  npm i argv-json-mapper
```

### Usecase

> script.js

```js
const { Modifier } = require("argv-json-mapper");

const modifier = new Modifier("taskdef.json");

// Argv is TASK_ARN
modifier.modify((argv) => ({
  taskDefinitionArn: argv[0],
}));
```

- TASK_ARN comes from environmental variable

- Cli

```
node scripts/script.js $TASK_ARN
```

> OR

```yml
version: 0.2
phases:
  install:
    runtime-versions:
      docker: 18

  pre_build:
    commands:
      - npm install

  build:
    commands:
      # Passing task arn to script js file as argv
      - node scripts/script.js $TASK_ARN
```
