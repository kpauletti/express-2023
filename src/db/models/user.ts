import { type Sequelize, DataTypes } from "sequelize";

import { BaseModel } from "./@basemodel";

export class User extends BaseModel<User> {
    static TABLENAME = "Users" as const;
    declare name: string;
    declare email: string;
    declare passwordHash: string;

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
