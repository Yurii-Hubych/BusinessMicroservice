import * as jwt from 'jsonwebtoken';
import {configs} from "../configs/configs";
import {ApiError} from "../errors/api.error";
import {ITokenPayload} from "../custom-types/token.type";

class TokenService {
    public checkAccessToken(token: string): ITokenPayload {
        try {
            const secret = configs.JWT_ACCESS_SECRET;
            return jwt.verify(token, secret) as ITokenPayload;
        }
        catch (e) {
            throw new ApiError("Invalid token", 401);
        }
    }
}

export const tokenService = new TokenService();