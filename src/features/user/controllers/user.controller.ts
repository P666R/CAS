import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '@/global/logging/logger';
import { catchAsync } from '@/global/utils/catchAsync.util';
import { SignupDTO } from '@/features/user/schemas/user.schema';
import { UserService } from '@/features/user/services/user.service';
import { TypedRequest } from '@/global/interfaces/request.interface';

export class UserController {
  private readonly logger = Logger.getInstance().createChildLogger({
    service: 'UserController',
  });

  constructor(private readonly userService: UserService) {}

  public createUser = catchAsync(
    async (req: TypedRequest<SignupDTO>, res: express.Response, _next: express.NextFunction) => {
      const user = await this.userService.createUser(req.body);
      this.logger.info({ userId: user.id }, 'User created successfully');
      res.status(StatusCodes.CREATED).json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    },
  );

  public getUserById = catchAsync(
    async (req: TypedRequest<unknown>, res: express.Response, _next: express.NextFunction) => {
      const user = await this.userService.getUserById(req.params.id);
      this.logger.info({ userId: user.id }, 'User fetched successfully');
      res.status(StatusCodes.OK).json({
        success: true,
        data: user,
      });
    },
  );
}
