import app from "./src/app.js";
import env from "./src/config/env.js";
import connectDatabase from "./src/config/database.js";

const startServer = async () => {
  await connectDatabase();

  app.listen(env.PORT, () => {
    console.log(
      `🚀 Server running at http://localhost:${env.PORT}`
    );
  });
};

startServer();