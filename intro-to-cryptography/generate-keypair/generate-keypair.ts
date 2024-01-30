import fs from 'fs';
import * as dotenv from 'dotenv';
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const env = process.env.NODE_ENV || 'development';

dotenv.config({ path: `.env.${env}` });

try {
  const keypair = getKeypairFromEnvironment("SECRET_KEY");

  if (!keypair) {
    throw new Error("Keypair could not be loaded from environment variable.");
  }

  console.log(`✅ Finished! We've loaded our secret key securely, using an env file!`);
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
}
