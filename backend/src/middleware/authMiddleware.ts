import { NextFunction, Request, Response } from "express";
import { UserPayload } from "../repositories/UserRepository";

const jwt = require('jsonwebtoken');

declare module "express" {
  // Inject additional properties on express.Request
  interface Request {
      session?: Record<string, UserPayload | null>
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies.access_token
  const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
  
  req.session = { user: null }
  let data = null
  try {
    data = jwt.verify(accessToken, accessTokenSecret)
    req.session.user = data
  } catch {}
  next()
};
