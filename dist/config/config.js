import { config } from "dotenv";
config({
    path: "./.env",
});
const env = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    CG_API_BASE: process.env.CG_API_BASE,
    CG_API_KEY: process.env.CG_API_KEY,
    POLL_INTERVAL_MS: process.env.POLL_INTERVAL_MS,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    NODE_ENV: process.env.NODE_ENV,
    USER_EMAIL: process.env.USER_EMAIL,
    JWT_SECRET: process.env.JWT_SECRET,
    FRONTEND_ROUTE: process.env.FRONTEND_ROUTE,
};
export default env;
//# sourceMappingURL=config.js.map