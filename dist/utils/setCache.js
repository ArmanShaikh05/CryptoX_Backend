import redis from "../lib/redis.js";
export const setCache = (coin, vs, payload) => {
    const key = `price:${coin}:${vs}`;
    redis.set(key, JSON.stringify(payload), "EX", 30);
    //   Useful in case of multiple backend servers needed the same data but not needed in this case
    redis.publish("prices:updates", JSON.stringify({ coin, vs, payload }));
};
//# sourceMappingURL=setCache.js.map