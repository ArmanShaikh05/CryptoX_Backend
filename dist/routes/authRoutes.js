import express from "express";
import { loginUser, logoutUser, registerNewUser, resetPassword, sendResetPasswordOtp, verifyResetPasswordOtp, } from "../controllers/authControllers.js";
const router = express.Router();
router.post("/register", registerNewUser);
router.post("/login", loginUser);
router.post("/send-otp", sendResetPasswordOtp);
router.post("/verify-otp", verifyResetPasswordOtp);
router.post("/reset-password", resetPassword);
router.get("/logout", logoutUser);
export default router;
//# sourceMappingURL=authRoutes.js.map