import express from 'express';
import { AuthController } from '@/features/user/controllers/auth.controller';
import { createSignupSchema, createLoginSchema } from '@/features/user/schemas/user.schema';
import { validateRequest } from '@/global/middlewares/requestValidator.middleware';

export class AuthRoute {
  public static createRoutes(authController: AuthController) {
    const authRoutes = express.Router();

    authRoutes.route('/signup').post(validateRequest(createSignupSchema), authController.signup);
    authRoutes.route('/login').post(validateRequest(createLoginSchema), authController.login);
    authRoutes.route('/logout').get(authController.logout);

    return authRoutes;
  }
}
