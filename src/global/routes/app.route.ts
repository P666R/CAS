import express from 'express';
import { User } from '@/features/user/models/user.model';
import { UserRepository } from '@/features/user/repositories/user.repository';
import { UserService } from '@/features/user/services/user.service';
import { UserController } from '@/features/user/controllers/user.controller';
import { UserRoute } from '@/features/user/routes/user.route';

interface RouteConfig {
  path: string;
  router: express.Router;
}

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRouter = UserRoute.createRoutes(userController);

const routes: RouteConfig[] = [{ path: '/api/v1/users', router: userRouter }];

export function appRoutes(app: express.Application) {
  routes.forEach(({ path, router }) => app.use(path, router));
}
