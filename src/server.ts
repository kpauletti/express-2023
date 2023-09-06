import app from "./app";
import { initDB } from "./db/models";
import { env } from "./utils/env";

app.listen(env.PORT.toString(), async () => {
    await initDB();
    console.log(`Server started on port ${app.get("port")}`);
});
