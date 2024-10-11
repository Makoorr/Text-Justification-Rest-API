import { JwtPayload } from "jsonwebtoken";

export interface RequestWithEmail extends Request {
    user: string | JwtPayload,
    headers: any,
}