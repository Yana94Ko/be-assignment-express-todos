import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import controllers from "./contexts";
import authenticator from "./middlewares/authenticater.middleware";

const app = express();
const port = 5555;
const jsonParser = bodyParser.json();

app.get("/health-check", (_, res) => {
  res.json("Server state is Good");
});
app.use(cookieParser());
app.use(authenticator);
app.use(jsonParser);
app.use(controllers);

app.listen(port, () => {
  console.log(`Server id Running at Port No"${port}"`);
});
