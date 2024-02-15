import express from "express";

const app = express();
const port = 5555;

app.get("/health-check", (_, res) => {
  res.json("Server state is Good");
});

app.listen(port, () => {
  console.log(`Server id Running at Port No"${port}"`);
});
