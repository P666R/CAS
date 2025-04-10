import { Router } from 'express';
import { UserController } from '@/features/user/controllers/user.controller';
import { validateRequest } from '@/global/middlewares/requestValidator.middleware';
import { signupSchema } from '@/features/user/schemas/user.schema';

export class UserRoute {
  public static createRoutes(userController: UserController): Router {
    const userRoutes = Router();

    userRoutes.route('/').post(validateRequest(signupSchema), userController.createUser);

    userRoutes.route('/:id').get(userController.getUserById);

    return userRoutes;
  }
}
