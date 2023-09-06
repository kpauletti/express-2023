import { Dialect, Sequelize } from "sequelize";
import { env } from "../../utils/env";
import configs from "../config/config";
import { User } from "./user";

type Configs = {
    [key in typeof env.NODE_ENV]: {
        username: string;
        password: string;
        database: string;
        host: string;
        dialect: Dialect;
    };
};

type DB = { sequelize: Sequelize };

const config = (configs as Configs)[env.NODE_ENV];

//TODO think of a typesafe way of doing this programmatically
const models = [User];

let db = {} as DB;

export async function initDB() {
    const sequelize = new Sequelize(config.database, config.username, config.password, config);

    for (const model of models) {
        model.setup(sequelize);
    }

    db.sequelize = sequelize;

    try {
        await sequelize.authenticate();
        console.log("Database connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw new Error(error);
    }
}

export default db;
