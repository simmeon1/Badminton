import fs from 'node:fs';
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });

const filePath = "./src/environments/environment.ts";
let envContent = fs.readFileSync(filePath, 'utf-8');
const matches = envContent.matchAll(/(\w+): '.*?'/g);
for (const match of matches) {
  envContent = envContent.replaceAll(match[0], match[1] + ": '" + process.env[match[1]] + "'");
}
fs.writeFileSync(filePath, envContent);
