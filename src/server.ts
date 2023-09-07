import app from "./app";
import { initDB } from "./db";
import { env } from "./utils/env";

app.listen(env.PORT, async () => {
    await initDB();
    console.log(`Server started on port ${env.PORT}`);
});
