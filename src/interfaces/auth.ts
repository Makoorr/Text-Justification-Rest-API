import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface RequestWithEmail extends Request {
    user: string | JwtPayload
}