import { app } from "./app.js";
import donenv from "dotenv";
donenv.config();

app.listen(process.env.PORT, () => {
  console.log(`This App is Running in Port ${process.env.PORT}`);
});
