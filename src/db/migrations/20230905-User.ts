import { DataTypes } from "sequelize";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryInterface.createTable("users", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: queryInterface.sequelize.literal("uuid_generate_v4()"),
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: queryInterface.sequelize.literal("NOW()"),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: queryInterface.sequelize.literal("NOW()"),
        },
    });
};

export const down: Migration = async ({ context: queryInterface }) => {
    await queryInterface.dropTable("users");
};
