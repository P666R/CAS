import { Router } from 'express';
import { signupSchema } from '@/features/user/schemas/user.schema';
import { UserRole } from '@/features/user/interfaces/user.interface';
import { AuthMiddleware } from '@/global/middlewares/auth.middleware';
import { UserController } from '@/features/user/controllers/user.controller';
import { validateRequest } from '@/global/middlewares/requestValidator.middleware';

export class UserRoute {
  public static createRoutes(userController: UserController, authMiddleware: AuthMiddleware): Router {
    const userRoutes = Router();

    userRoutes.use(authMiddleware.protect, authMiddleware.restrictTo([UserRole.ADMIN]));

    userRoutes.route('/').post(validateRequest(signupSchema), userController.createUser);
    userRoutes.route('/:id').get(userController.getUserById);

    return userRoutes;
  }
}
