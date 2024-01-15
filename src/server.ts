import app from "./app";

import db from "./configs/mongo.config";

import "dotenv/config";

app.listen(process.env.API_PORT, async () => {
  await db();
});

export default app;
