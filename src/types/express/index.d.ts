import { UserAttributes } from "../../db/models/user";
export {};

declare global {
    namespace Express {
        export interface Request {
            user?: UserAttributes;
        }
    }
}
