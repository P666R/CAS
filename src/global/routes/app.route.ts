import express from 'express';
import { User } from '@/features/user/models/user.model';
import { UserRepository } from '@/features/user/repositories/user.repository';
import { UserService } from '@/features/user/services/user.service';
import { UserController } from '@/features/user/controllers/user.controller';
import { UserRoute } from '@/features/user/routes/user.route';
import { AuthService } from '@/features/user/services/auth.service';
import { AuthController } from '@/features/user/controllers/auth.controller';
import { AuthRoute } from '@/features/user/routes/auth.route';
import { AuthMiddleware } from '@/global/middlewares/auth.middleware';

interface RouteConfig {
  path: string;
  router: express.Router;
}

const userRepository = new UserRepository(User);

const userService = new UserService(userRepository);
const userController = new UserController(userService);

const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const authMiddleware = new AuthMiddleware(authService, userRepository);

const userRouter = UserRoute.createRoutes(userController, authMiddleware);
const authRouter = AuthRoute.createRoutes(authController);

const routes: RouteConfig[] = [
  { path: '/api/v1/users', router: userRouter },
  { path: '/api/v1/auth', router: authRouter },
];

export function appRoutes(app: express.Application) {
  routes.forEach(({ path, router }) => app.use(path, router));
}
