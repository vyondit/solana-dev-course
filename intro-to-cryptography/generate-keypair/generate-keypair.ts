import * as dotenv from 'dotenv';
import fs from 'fs/promises';
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

function isValidSecretKey(key: string): boolean {
  try {
    const keyArray = JSON.parse(key);
    return Array.isArray(keyArray) && keyArray.every(num => Number.isInteger(num) && num >= 0 && num <= 255);
  } catch {
    return false;
  }
}

loadAndValidateKey();

async function loadAndValidateKey() {
  try {
    const env = process.env.NODE_ENV || 'development';
    const envFileContent = await fs.readFile(`.env.${env}`, { encoding: 'utf-8' });
    const envConfig = dotenv.parse(envFileContent);
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }

    const secretKey = process.env.SECRET_KEY;

    if (!secretKey || !isValidSecretKey(secretKey)) {
      throw new Error("Invalid or missing secret key.");
    }

    const keypair = getKeypairFromEnvironment("SECRET_KEY");

    console.log(`✅ Finished! We've loaded our secret key securely, using an env file!`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}
