import dotenv from 'dotenv';

dotenv.config();

export interface Environment {
  DISCORD_TOKEN: string;
  DISCORD_CLIENT_ID: string;
}

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error('Missing required environment variables');
}

export const config: Environment = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
};
