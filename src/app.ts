import express from "express";
import helmet from "helmet";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import actuator from "express-actuator";
import { env } from "./config/env";
import { MainRouter } from "./routes";

const app = express();

app.use(helmet());

const logMode = env.NODE_ENV === "development" ? "dev" : "combined";
app.use(logger(logMode));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", MainRouter);

/**
 * Exposes /status/health, /status/info, /status/metrics
 */
app.use(actuator({ basePath: "/status" }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

export default app;
