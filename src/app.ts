import cors from "cors";
import express, { type Express } from "express";
import { routes } from "./router.ts";

const app: Express = express();

// common middelware
app.use(cors());
app.use(express.json());

app.use(routes);

export { app };
