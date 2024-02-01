import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

async function loadWallet(env: string) {
  try {
    const envPath = path.join(__dirname, `.env.${env}`);
    const envFileContent = await fs.readFile(envPath, { encoding: 'utf-8' });
    dotenv.config({ path: envPath });

    const publicKey = new PublicKey(process.env.PUBLIC_KEY);
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const balanceInLamports = await connection.getBalance(publicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(
      `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
    );

  } catch (error) {
    console.error(`❌ Error reading from .env.${env}: ${error.message}`);
  }
}

const action = process.argv[2]; // "load"
const envArg = process.argv[3]; // "development", "staging", "production"
const validEnvironments = ['development', 'staging', 'production'];

if (!validEnvironments.includes(envArg)) {
  console.error('❌ Invalid environment. Please specify "development", "staging", or "production".');
} else if (action === "load") {
  loadWallet(envArg);
} else {
  console.error('❌ Invalid action. Please specify "load".');
}
