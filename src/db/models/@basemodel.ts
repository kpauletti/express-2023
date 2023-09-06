import { UUID } from "crypto";
import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    type Sequelize,
} from "sequelize";

type BaseAttributes = {
    id: UUID;
    createdAt: Date;
    updatedAt: Date;
};

export type modelSetup = (sequelize: Sequelize) => void;

export abstract class BaseModel<T extends Model<any, any>>
    extends Model<InferAttributes<T>, InferCreationAttributes<T>>
    implements BaseAttributes
{
    declare id: CreationOptional<UUID>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: Date | null;

    static attributes() {
        return {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        };
    }
}
