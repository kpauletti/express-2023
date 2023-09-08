import { type Sequelize, DataTypes } from "sequelize";
import jwt from "jsonwebtoken";
import { BaseModel } from "./_basemodel";
import { env } from "../../config/env";
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

    static async verifyJWT(token: string) {
        const decoded = jwt.verify(token, env.JWT_SECRET) as {
            id: string;
            email: string;
        };
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new Error("Unauthorized");
        }
        return user;
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
