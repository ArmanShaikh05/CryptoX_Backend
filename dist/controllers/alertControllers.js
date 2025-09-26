import { Alert } from "../models/alertModel.js";
import redis from "../lib/redis.js";
export const createAlert = async (req, res) => {
    const { coinId, vsCurrency, comparator, value } = req.body;
    if (!coinId || !vsCurrency || !comparator || !value) {
        return res.status(400).json({
            success: false,
            message: "Incomplete details recieved",
        });
    }
    if (!req.user?.id) {
        return res.status(400).json({
            success: false,
            message: "UserId not recieved",
        });
    }
    const alert = await Alert.create({
        coinId,
        comparator,
        userId: req.user.id,
        value,
        vsCurrency,
    });
    // ensure coin is added to watched set so poller includes it
    await redis.sadd("watched:coins", `${alert.coinId}:${alert.vsCurrency}`);
    res.status(200).json({
        sucess: true,
        message: "Alert created successfully",
    });
};
export const getAllUserAlerts = async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "UserId not recieved",
        });
    }
    const list = await Alert.find({ userId });
    res.json(list);
};
export const watchCoins = async (req, res) => {
    const { coinId, vs } = req.body;
    const key = "watched:coins";
    await redis.sadd(key, `${coinId}:${vs}`);
    res.send({ success: true });
};
//# sourceMappingURL=alertControllers.js.map