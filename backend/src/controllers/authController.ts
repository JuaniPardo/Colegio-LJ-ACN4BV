import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import "dotenv/config";
import { RegisterCredentials, UpdateCredentials, USER_TYPES_MAP, UserEmailNotAvailableError, UserIsNotActiveError, UsernameNotAvailableError, UserNotFoundError, UserRepository, UserTypeError } from "../repositories/UserRepository";
import { MissingJWTSecretError } from "../config/errors/configErrors";

export const getAllUsers = async (req: Request, res: Response) => {
  // extract user from request
  const user = req.session?.user;
  // validate user is authenticated
  if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
  // validate user is admin
  if (user.user_type !== USER_TYPES_MAP.ADMINISTRATOR) return res.status(403).json({ success: false, message: "You are unauthorized to perform this action." });
  try {
    const users = await UserRepository.getAllUsers()
    return res.status(200).json({ success: true, data: users });
  } catch {
    return res.status(500).json({ success: false, message: "Internal server error getting users" });
  }
}

export const getUserTypes = async (req: Request, res: Response) => {
  // extract user from request
  const user = req.session?.user;
  // validate user is authenticated
  if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
  // validate user is admin
  if (user.user_type !== USER_TYPES_MAP.ADMINISTRATOR) return res.status(403).json({ success: false, message: "You are unauthorized to perform this action." });
  return res.status(200).json({ success: true, data: UserRepository.getUserTypes() });
};

export const getUserBasicInfo = async (req: Request, res: Response) => {
  // extract user from request
  const user = req.session?.user;
  // validate user is authenticated
  if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
  // get user basic info
  const userID = user._id
  try {
    const userBasicInfo = UserRepository.userBasicInfo({ _id: userID });
    return res.status(200).json({ success: true, data: userBasicInfo});
  } catch {
    return res.status(401).json({ success: false, message: "User not found." });
  }
};

export const getUserData = async (req: Request, res: Response) => {
  // validate params
  const { id } = req.params
  if (!id) return res.status(400).json({ success: false, message: "id is required." })
  // extract user from request
  const user = req.session?.user;
  // validate user is authenticated
  if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
  // validate user is admin
  if (user.user_type !== USER_TYPES_MAP.ADMINISTRATOR) return res.status(403).json({ success: false, message: "You are unauthorized to perform this action." });
  try {
    // get user basic info
    const userData = UserRepository.userData({_id: id})
    return res.status(200).json({ success: true, data: userData });
  } catch(error: any) {
    return res.status(404).json({ success: false, message: error.message})
  }
};

export const login = async (req: Request, res: Response) => {
  // 1. Get username and password request parameters
  const { username, password } = req.body;
  // 2. Validate username and password exists
  if (!username) return res.status(400).json({ message: "username is required" });
  if (!password) return res.status(400).json({ message: "password is required" });
  // 3. Login with user credentials in db
  try {
    const user = await UserRepository.login({ username, password });
    const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

    if (!accessTokenSecret) return res.status(400).json({ success: false, message: "missing JWT_ACCESS_TOKEN_SECRET" });
    if (!refreshTokenSecret) return res.status(400).json({ success: false, message: "missing JWT_REFRESH_TOKEN_SECRET" });

    const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: "15m" });
    const refreshToken = jwt.sign(user, refreshTokenSecret, { expiresIn: "7d" });
    // 6. Return 200 with access token
    return res
      .status(200)
      .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
      })
      .cookie("refresh_token", refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
      .json({ success: true, message: "Login successfully.", access_token: accessToken, refresh_token: refreshToken });
  } catch (err) {
    if(err instanceof UserIsNotActiveError) {
      return res.status(403).json({ success: false, code: 403, message: "User is not active in the system. Please contact an administrator." });
    }
    return res.status(400).json({ success: false, message: "Login failed, please verify your credentials." });
  }
};

export const create = async (req: Request, res: Response) => {
  // 1. Get data in request body
  const { username, password, user_type, confirmPassword, nombre, apellido, email }: RegisterCredentials = req.body;
  // 2. Validate data
  let missingField: string | null = null;
  if (!nombre) missingField = "nombre is required";
  if (!apellido) missingField = "apellido is required";
  if (!username) missingField = "username is required";
  if (!password) missingField = "password is required";
  if (!confirmPassword) missingField = "confirmPassword is required";
  if (!user_type) missingField = "user_type is required";
  if (!email || email.indexOf("@") == -1) missingField = "email is not valid or required";
  if (missingField != null) return res.status(400).json({ message: `${missingField}` });
  if (password != confirmPassword) return res.status(400).json({ message: "Password confirmation doesn't match." });
  // 3. Connect to db
  try {
    const id = await UserRepository.create({
      username,
      password,
      confirmPassword,
      nombre,
      apellido,
      email,
      user_type,
    });
    res.status(200).json({ success: true, id });
  } catch (err: any) {
    if (err instanceof UserTypeError) {
      res.status(400).json({
        success: false,
        message: `User type "${user_type}" is not a valid type of user.`,
      });
    } else if (err instanceof UsernameNotAvailableError) {
      res.status(400).json({
        success: false,
        message: `Username "${username}" already exists.`,
      });
    } else if (err instanceof UserEmailNotAvailableError) {
      res.status(400).json({
        success: false,
        message: `Email "${email}" already exists.`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
};

export const update = async (req: Request, res: Response) => {
  // extract user from request
  const user = req.session?.user;
  // validate user is authenticated
  if (!user) return res.status(401).json({ success: false, message: "User is not authenticated." });
  // validate user is admin
  if (user.user_type !== USER_TYPES_MAP.ADMINISTRATOR) return res.status(403).json({ success: false, message: "You are unauthorized to perform this action." });
  // 1. Get data in request body
  const { id, user_type, nombre, apellido, is_active }: UpdateCredentials = req.body;
  // 2. Validate data
  let missingField: string | null = null;
  if (!id) missingField = "id is required";
  if (!nombre) missingField = "nombre is required";
  if (!apellido) missingField = "apellido is required";
  if (!user_type) missingField = "user_type is required";
  if (is_active === null) missingField = "is_active is required";
  if (missingField != null) return res.status(400).json({ message: `${missingField}` });
  // 3. Connect to db
  try {
    const updatedID = await UserRepository.update({
      id,
      nombre,
      apellido,
      user_type,
      is_active
    });
    res.status(200).json({ success: true, message: `${updatedID} has been updated successfully` });
  } catch (err: any) {
    if (err instanceof UserTypeError) {
      res.status(400).json({
        success: false,
        message: `User type "${user_type} is not a valid type of user.`,
      });
    } else if (err instanceof UserNotFoundError) {
      res.status(400).json({
        success: false,
        message: `User "${id} was not found.`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Registration failed, please verify missing or wrong fields.",
        error_message: err.message,
      });
    }
  }
};;;;;

export const logout = (req: Request, res: Response) => {
  return res.status(200).clearCookie("access_token").clearCookie("refresh_token").json({ success: true, message: "logged out successfully." });
};

export const refresh = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.status(400).json({ success: false, message: "refresh_token is required to refresh tokens." });

  try {
    // GET TOKENS SECRETS
    const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
    // VALIDATE TOKEN SECRETS EXIST
    if (!accessTokenSecret) throw new MissingJWTSecretError("Cannot verify jwt due to internal config error");
    if (!refreshTokenSecret) throw new MissingJWTSecretError("Cannot verify jwt due to internal config error");

    // VERIFY REFRESH TOKEN AND GENERATE NEW ONES
    const payload = <Record<string, string>>jwt.verify(refreshToken, refreshTokenSecret);
    const { exp: _, iat: __, ...newPayload } = payload;
    const newAccessToken = jwt.sign(newPayload, accessTokenSecret, { expiresIn: "15m" });
    const newRefreshToken = jwt.sign(newPayload, refreshTokenSecret, { expiresIn: "7d" });

    // RETURN NEW TOKENS
    res
      .status(200)
      .cookie("access_token", newAccessToken, { httpOnly: true, maxAge: 1000 * 60 * 15 })
      .cookie("refresh_token", newRefreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
      .json({ success: true, message: "Refreshed tokens succesfully", access_token: newAccessToken, refresh_token: newRefreshToken });
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return res.status(400).json({ success: false, message: "Cannot verify provided token" });
    } else if (err instanceof MissingJWTSecretError) {
      return res.status(500).json({ success: false, message: err.message });
    } else {
      return res.status(500).json({ success: false, message: "Internal server error while refreshing token" });
    }
  }
};
