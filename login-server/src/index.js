import express from "express";
import "dotenv/config";
import {authRouter} from "./routes/auth.route.js";
import cors from "cors";
import {userRouter} from "./routes/user.route.js";
import {errorMiddleware} from "./middlewares/errorMiddleware.js";
import cookieParser from 'cookie-parser';


const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: process.env.CLIENT_HOST || "http://localhost:3000",
        credentials: true,
    })
);
app.use(authRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
});
