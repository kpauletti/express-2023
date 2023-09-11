import { Sequelize } from "sequelize";
import { env } from "../config/env";
import { User } from "./models/user";
import { getMigrator } from "./umzug";

const models = [User];

export const db = {} as { sequelize: Sequelize };

export async function initDB() {
    const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
        host: env.DB_HOST,
        dialect: "postgres",
        logging: env.NODE_ENV === "development" ? console.log : false,
    });
    try {
        const migrator = await getMigrator(sequelize);
        await migrator.up();

        for (const model of models) {
            model.setup(sequelize);
        }

        db.sequelize = sequelize;

        await sequelize.authenticate();

        console.log("Database connection successful.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw new Error(error);
    }
}
