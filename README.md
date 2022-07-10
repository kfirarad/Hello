# Home Assigment

# What's in this branch?
This is Full stack version of the task. using NextJs as a full stack app engine.

# Technologies and Techniques
Used `create-next-app` for scaffolding.
[NextJs](https://nextjs.org/) is the app engine. It is serving both the backend and the frontend components 
In order to support fuzyness for the testname field, I used [string-similarity](https://www.npmjs.com/package/string-similarity) npm package. On produciton, I would make the similarity throshold higher, while logginh "unknown" test name and add aliass names to the dataset.
Also used [tailwind-css](https://tailwindcss.com/) for styling.

## In order to run
Simply `npm install` and `npm start`
both backend and frontnd will be available in http://localhost:3000

## DB
For the sake of simplicity I used simple JSON file based db (https://www.npmjs.com/package/node-json-db) 
