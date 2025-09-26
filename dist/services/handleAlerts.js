import { Alert } from "../models/alertModel.js";
import { notifyUser } from "./notifications.js";
export const handleAlerts = async (coin, vs, price) => {
    const alerts = await Alert.find({
        coinId: coin,
        vsCurrency: vs,
        active: true,
    });
    for (const a of alerts) {
        if (a.lastTriggeredAt)
            continue;
        let trigger = false;
        switch (a.comparator) {
            case "gt":
                trigger = price > a.value;
                break;
            case "lt":
                trigger = price < a.value;
                break;
        }
        if (trigger) {
            a.active = false;
            a.lastTriggeredAt = new Date();
            await a.save();
            // notify
            await notifyUser(a.userId.toString(), { coin, vs, price });
        }
    }
};
//# sourceMappingURL=handleAlerts.js.map