npm init -y

npm install typescript @solana/web3.js esrun @solana-developers/helpers

npx esrun generate-keypair.ts [create|read] [development|staging|production]

Example:

npx esrun generate-keypair.ts create development

This will create a hidden file '.env.development' containing the public and secret key.
The read option with a environment selected will read the file.
