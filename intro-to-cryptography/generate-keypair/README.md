# Solana Keypair Management Script

This script provides a simple and secure way to manage Solana keypairs for different environments (development, staging, production). It allows users to either generate a new keypair and save it to an environment-specific `.env` file or read an existing keypair from such a file.

## Features

- **Create Keypair**: Generate a new Solana keypair and save it to the appropriate `.env` file.
- **Read Keypair**: Read and display a keypair from an existing `.env` file.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/vyondit/solana-dev-course.git
   cd solana-dev-course
   ```

2. **Install Dependencies**:
   ```bash
   npm init -y
   npm install typescript @solana/web3.js esrun @solana-developers/helpers
   ```

## Usage

The script can be run in two modes: create and read.

### Creating a Keypair

To create a new keypair and save it to an environment-specific `.env` file:

```bash
npx esrun generate_keypair.ts create [environment]
```

Where `[environment]` is one of `development`, `staging`, or `production`.

Example:

```bash
npx esrun generateKeypair.js create development
```

### Reading a Keypair

To read and display a keypair from an existing `.env` file:

```bash
npx esrun generate-keypair.ts read [environment]
```

Example:

```bash
npx esrun generate-keypair.ts read development
```

## Security Practices

- Ensure that `.env` files, especially for production, are properly secured and not checked into version control.
- Regularly rotate your secret keys and update the environment variables accordingly.
- Limit the distribution of these keys and maintain strict access control.
