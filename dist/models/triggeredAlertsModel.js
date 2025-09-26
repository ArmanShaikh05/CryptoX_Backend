import { Schema, model } from "mongoose";
const TriggerSchema = new Schema({
    alertId: String,
    userId: String,
    coinId: String,
    vsCurrency: String,
    priceAtTrigger: Number,
    triggeredAt: { type: Date, default: Date.now },
});
export const TriggeredAlert = model("TriggeredAlert", TriggerSchema);
//# sourceMappingURL=triggeredAlertsModel.js.map