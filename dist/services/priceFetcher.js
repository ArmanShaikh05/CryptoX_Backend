import axios from "axios";
import { redis } from "../lib/redis.js";
import env from "../config/config.js";
import { io } from "../server.js";
import { setCache } from "../utils/setCache.js";
import { handleAlerts } from "./handleAlerts.js";
export const startPriceIngest = () => {
    setInterval(async () => {
        try {
            // get coins to poll e.g. ["bitcoin:usd","ethereum:usd"]
            const watched = await redis.smembers("watched:coins");
            if (watched.length === 0)
                return;
            // batch into groups of 50 (api supports multiple ids)
            const grouped = [];
            // Getting unique ids from the watchlist
            const ids = watched.map((s) => s.split(":")[0]);
            const uniqIds = Array.from(new Set(ids));
            // Create a batch of 50 coins to fetch the data from coingecko api
            const batchSize = 50;
            for (let i = 0; i < uniqIds.length; i += batchSize)
                grouped.push(uniqIds.slice(i, i + batchSize));
            for (const batch of grouped) {
                // check if anything in null or empty
                const ids = batch.filter(Boolean);
                if (ids.length === 0)
                    continue;
                const idsParam = ids.join(",");
                const vs = "usd";
                const url = `${env.CG_API_BASE}/simple/price`;
                console.log("Fetching prices for:", idsParam);
                // Fetching the price data from API
                const res = await axios.get(url, {
                    params: { ids: idsParam, vs_currencies: vs },
                });
                const data = res.data;
                console.log("Received data:", data);
                for (const coin of batch) {
                    const price = data[coin]?.[vs];
                    if (price == null)
                        continue;
                    const payload = { price, ts: Date.now() };
                    // Set the cache in  redis
                    setCache(coin, vs, payload);
                    // Send the real time price data to frontend using socket
                    io.to(`coin:${coin}:${vs}`).emit("price:update", {
                        coin,
                        vs,
                        price,
                        ts: payload.ts,
                    });
                    // check if any alert is triggered
                    await handleAlerts(coin, vs, price);
                }
            }
        }
        catch (err) {
            console.error("poll error", err?.response?.status, err?.message);
        }
    }, Number(env.POLL_INTERVAL_MS));
};
//# sourceMappingURL=priceFetcher.js.map