import { Schema, model } from "mongoose";

const AlertSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coinId: {
      type: String,
      required: true,
    },
    vsCurrency: {
      type: String,
      default: "usd",
    },
    comparator: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    referencePrice: {
      type: Number,
    },
    cooldownSeconds: {
      type: Number,
      default: 300,
    },
    lastTriggeredAt: Date,
  },
  { timestamps: true }
);

AlertSchema.index({ coinId: 1, vsCurrency: 1, active: 1 });

export const Alert = model("Alert", AlertSchema);
