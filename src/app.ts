import express from "express";
import controllers from "./contexts";

const app = express();
const port = 5555;

app.get("/health-check", (_, res) => {
  res.json("Server state is Good");
});

app.use(controllers);

app.listen(port, () => {
  console.log(`Server id Running at Port No"${port}"`);
});
