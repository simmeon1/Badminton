// The script looks at environment variables from both environment and .env file
// and ONLY updates the values of the keys in environment.ts if the keys exist in the vars from above.
// .env file is only useful for development (in fact only the keys matter and not the values)
// as pipelines will not have an .env file from source control but will have env vars explicitly set up.

import fs from 'node:fs';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const filePath = './src/environments/environment.ts';
let environmentTsContent = fs.readFileSync(filePath, 'utf-8');
const matches = environmentTsContent.matchAll(/(\w+): '.*?'/g);
for (const match of matches) {
  environmentTsContent = environmentTsContent.replaceAll(
    match[0],
    match[1] + ": '" + process.env[match[1]] + "'",
  );
}
fs.writeFileSync(filePath, environmentTsContent);
