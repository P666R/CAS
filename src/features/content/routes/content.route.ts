import { Router } from 'express';
import { UserRole } from '@/features/user/interfaces/user.interface';
import { ContentController } from '../controllers/content.controller';
import { AuthMiddleware } from '@/global/middlewares/auth.middleware';
import { validateRequest } from '@/global/middlewares/requestValidator.middleware';
import { createContentSchema, updateContentSchema } from './../schemas/content.schema';

export class ContentRoute {
  public static createRoutes(contentController: ContentController, authMiddleware: AuthMiddleware): Router {
    const contentRoutes = Router();

    contentRoutes.use(authMiddleware.protect);

    contentRoutes
      .route('/')
      .get(authMiddleware.restrictTo([UserRole.ADMIN]), contentController.findAllContents)
      .post(
        authMiddleware.restrictTo([UserRole.USER]),
        validateRequest(createContentSchema),
        contentController.createContent,
      );

    contentRoutes
      .route('/:id')
      .patch(
        authMiddleware.restrictTo([UserRole.ADMIN]),
        validateRequest(updateContentSchema),
        contentController.updateContentById,
      );

    return contentRoutes;
  }
}
