import dotenv from 'dotenv';

dotenv.config();

export interface Environment {
  DISCORD_TOKEN: string;
  DISCORD_CLIENT_ID: string;
  BOT_KEY: string;
}

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, BOT_KEY } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !BOT_KEY) {
  throw new Error('Missing required environment variables');
}

export const config: Environment = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  BOT_KEY,
};
