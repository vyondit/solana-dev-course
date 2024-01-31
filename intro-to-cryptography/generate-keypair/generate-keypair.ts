import { Keypair } from "@solana/web3.js";
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

async function createKeypair(env: string) {
  const keypair = Keypair.generate();

  const publicKey = keypair.publicKey.toBase58();
  const secretKey = JSON.stringify(Array.from(keypair.secretKey));

  const envContent = `PUBLIC_KEY="${publicKey}"\nSECRET_KEY="${secretKey}"\n`;

  try {
    await fs.writeFile(path.join(__dirname, `.env.${env}`), envContent);
    console.log(`✅ Keypair created and saved to .env.${env}`);
  } catch (error) {
    console.error(`❌ Error writing to .env.${env}: ${error.message}`);
  }
}

async function readKeypair(env: string) {
  try {
    const envPath = path.join(__dirname, `.env.${env}`);
    const envFileContent = await fs.readFile(envPath, { encoding: 'utf-8' });
    dotenv.config({ path: envPath });

    console.log(`Public Key: ${process.env.PUBLIC_KEY}`);
    console.log(`Secret Key: ${process.env.SECRET_KEY}`);
    console.log(`✅ Keypair read from .env.${env}`);
  } catch (error) {
    console.error(`❌ Error reading from .env.${env}: ${error.message}`);
  }
}

const action = process.argv[2]; // "create" or "read"
const envArg = process.argv[3]; // "development", "staging", "production"
const validEnvironments = ['development', 'staging', 'production'];

if (!validEnvironments.includes(envArg)) {
  console.error('❌ Invalid environment. Please specify "development", "staging", or "production".');
} else if (action === "create") {
  createKeypair(envArg);
} else if (action === "read") {
  readKeypair(envArg);
} else {
  console.error('❌ Invalid action. Please specify "create" or "read".');
}
