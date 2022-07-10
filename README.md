# Home Assigment

# What's in this branch?
This is Frontnd version of the task. No DB or Backend involve.
Can be connected pretty easliy to Backend-as-a-service (Firebase or Supabase), or use the browser LocalStorage.

# Technologies and Techniques
Used `create-react-app` for scaffolding.
As it is pretty basic app, the state is being the main App component (HHApp).
In order to support fuzyness for the testname field, I used [string-similarity](https://www.npmjs.com/package/string-similarity) npm package. On produciton, I would make the similarity throshold higher, while logginh "unknown" test name and add aliass names to the dataset.

## In order to run
Simply `npm install` and `npm start`
Frontnd will be available in http://localhost:3000
