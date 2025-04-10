import express from 'express';
import { catchAsync } from '@/global/utils/catchAsync.util';
import { AuthService } from '@/features/user/services/auth.service';
import { TypedRequest } from '@/global/interfaces/request.interface';
import { UserRepository } from '@/features/user/repositories/user.repository';
import { ForbiddenError, UnauthorizedError } from '@/global/errors/custom.error';
import { CurrentUser, UserRole } from '@/features/user/interfaces/user.interface';

export class AuthMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  public protect = catchAsync(
    async (req: TypedRequest<unknown>, _res: express.Response, next: express.NextFunction) => {
      const token = req.cookies.jwt as string;
      if (!token) {
        throw new UnauthorizedError('Unauthorized, Please log in', { url: req.originalUrl });
      }

      const decoded = this.authService.verifyToken(token);
      const user = await this.userRepository.findUserById(decoded.id);
      if (!user) {
        throw new UnauthorizedError('User no longer exists', { id: decoded.id });
      }

      req.currentUser = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      } as CurrentUser;
      next();
    },
  );

  public restrictTo =
    (roles: UserRole[]) => (req: TypedRequest<unknown>, _res: express.Response, next: express.NextFunction) => {
      if (!req.currentUser) {
        throw new UnauthorizedError('Unauthorized, Please log in');
      }

      if (!roles.includes(req.currentUser.role)) {
        throw new ForbiddenError('You do not have permission to perform this action', {
          id: req.currentUser.id,
          role: req.currentUser.role,
        });
      }
      next();
    };
}
