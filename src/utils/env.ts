import { z } from "zod";

type Simplify<T> = { [P in keyof T]: T[P] } & {};

const schema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z
        .string()
        .default("3000")
        .transform((val) => parseInt(val, 10)),
    DB_PORT: z
        .string()
        .default("5432")
        .transform((val) => parseInt(val, 10)),
    DB_HOST: z.string().default("localhost"),
    DB_NAME: z.string().default("app"),
    DB_USER: z.string().default("postgres"),
    DB_PASSWORD: z.string().default(""),
    JWT_SECRET: z.string().default("secret"),
});

const parsed = schema.safeParse(process.env);

if (parsed.success === false) {
    console.error("Invalid env variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid env variables");
}

export const env = parsed.data as Simplify<z.infer<typeof schema>>;
