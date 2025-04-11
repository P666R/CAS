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
import { ContentRepository } from '@/features/content/repositories/content.repository';
import { Content } from '@/features/content/models/content.model';
import { ContentService } from '@/features/content/services/content.service';
import { ContentController } from '@/features/content/controllers/content.controller';
import { ContentRoute } from '@/features/content/routes/content.route';

interface RouteConfig {
  path: string;
  router: express.Router;
}

const userRepository = new UserRepository(User);
const contentRepository = new ContentRepository(Content);

const userService = new UserService(userRepository);
const userController = new UserController(userService);

const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const contentService = new ContentService(contentRepository);
const contentController = new ContentController(contentService);

const authMiddleware = new AuthMiddleware(authService, userRepository);

const authRouter = AuthRoute.createRoutes(authController);
const userRouter = UserRoute.createRoutes(userController, authMiddleware);
const contentRouter = ContentRoute.createRoutes(contentController, authMiddleware);

const routes: RouteConfig[] = [
  { path: '/api/v1/users', router: userRouter },
  { path: '/api/v1/auth', router: authRouter },
  { path: '/api/v1/content', router: contentRouter },
];

export function appRoutes(app: express.Application) {
  routes.forEach(({ path, router }) => app.use(path, router));
}
