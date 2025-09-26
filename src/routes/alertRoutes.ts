import { Router } from "express";
import {
  createAlert,
  getAllUserAlerts,
  watchCoins,
} from "../controllers/alertControllers.js";
import { useAuth } from "../middleware/useAuth.js";
const router = Router();

router.post("/", useAuth, createAlert);

router.get("/user/alerts", useAuth, getAllUserAlerts);

router.post("/coins/watch", watchCoins);

export default router;
