import dotenv from "dotenv";

dotenv.config();

export const config = {
  database: {
    login: process.env.DATABASE_LOGIN
  },
  server: {
    login: process.env.MONGODB_LOGIN,
    port: process.env.PORT || 8086,
  },
};
