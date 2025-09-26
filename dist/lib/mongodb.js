import mongoose from "mongoose";
import env from "../config/config.js";
const connectDb = () => {
    mongoose
        .connect(env.MONGO_URI, { dbName: "CryptoTracker" })
        .then(() => console.log("Database connected"))
        .catch((err) => console.log(err));
};
export default connectDb;
//# sourceMappingURL=mongodb.js.map