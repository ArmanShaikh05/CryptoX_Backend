import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import env from "./config/config.js";
import connectDb from "./lib/mongodb.js";
import alertRoutes from "./routes/alertRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { startPriceIngest } from "./services/priceFetcher.js";
import cookieParser from "cookie-parser";
const app = express();
// USING CORS
app.use(cors({
    origin: [env.FRONTEND_ROUTE],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
// USING MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
// USING ROUTES
app.use("/api/v1/alerts", alertRoutes);
app.use("/api/v1/auth", authRoutes);
// INITIALIZING SOCKET
const http = createServer(app);
export const io = new Server(http, {
    cors: { origin: [env.FRONTEND_ROUTE], credentials: true },
});
io.on("connection", (socket) => {
    console.log("socket connected", socket.id);
    socket.on("subscribe", ({ coinId, vs }) => {
        const room = `coin:${coinId}:${vs}`;
        socket.join(room);
        console.log(`Socket joined room ${room}`);
    });
    socket.on("auth", (userId) => {
        console.log(`${userId} joined room`);
        socket.join(`user:${userId}`);
    });
});
// Starting the server as an IIFE function
(async () => {
    connectDb();
    http.listen(env.PORT, () => console.log(`listening ${env.PORT}`));
    startPriceIngest();
})();
//# sourceMappingURL=server.js.map