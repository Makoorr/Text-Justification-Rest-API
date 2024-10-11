import { JwtPayload } from "jsonwebtoken";

export const connectedUsers: { [email: string]: { token: string | JwtPayload, wordCount: number, lastReset: Date } } = {};
export const mockDatabase: string[] = ["user1@mail.com", "user2@mail.com", "user3@mail.com"];