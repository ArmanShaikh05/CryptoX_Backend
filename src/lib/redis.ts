import Redis from "ioredis";
import env from "../config/config.js";

export const redis = new Redis.default({
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  password: env.REDIS_PASSWORD,
});

export default redis;
