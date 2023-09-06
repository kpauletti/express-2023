import { type Sequelize, DataTypes } from "sequelize";
import jwt from "jsonwebtoken";
import { BaseModel } from "./@basemodel";
import { env } from "../../utils/env";

export class User extends BaseModel<User> {
    static TABLENAME = "Users" as const;
    declare name: string;
    declare email: string;
    declare passwordHash: string;

    generateJWT() {
        return jwt.sign(
            {
                id: this.id,
                email: this.email,
            },
            env.JWT_SECRET
        );
    }

    static setup(sequelize: Sequelize) {
        User.init(
            {
                ...BaseModel.attributes(),
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                passwordHash: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: User.TABLENAME,
            }
        );
    }
}
