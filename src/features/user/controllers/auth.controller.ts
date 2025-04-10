import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/global/config/env/env.config';
import { catchAsync } from '@/global/utils/catchAsync.util';
import { AuthService } from '@/features/user/services/auth.service';
import { TypedRequest } from '@/global/interfaces/request.interface';
import { CreateLoginDTO, CreateSignupDTO } from '@/features/user/schemas/user.schema';
import { excludeFields } from '@/global/utils/excludeFields.util';

const cookieOptions: express.CookieOptions = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: 'strict',
  maxAge: 86400000,
};

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public signup = catchAsync(
    async (req: TypedRequest<CreateSignupDTO>, res: express.Response, _next: express.NextFunction) => {
      const user = await this.authService.signup(req.body);
      const token = this.authService.generateToken({
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      });

      res.cookie('jwt', token, cookieOptions);

      res.status(StatusCodes.CREATED).json({
        success: true,
        data: excludeFields(user, ['password', '__v']),
      });
    },
  );

  public login = catchAsync(
    async (req: TypedRequest<CreateLoginDTO>, res: express.Response, _next: express.NextFunction) => {
      const user = await this.authService.login(req.body);
      const token = this.authService.generateToken({
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      });

      res.cookie('jwt', token, cookieOptions);

      res.status(StatusCodes.OK).json({
        success: true,
        data: excludeFields(user, ['password', '__v']),
      });
    },
  );

  public logout = (_req: TypedRequest<unknown>, res: express.Response, _next: express.NextFunction) => {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: env.isProduction,
      sameSite: 'strict',
    });

    res.status(StatusCodes.OK).json({
      success: true,
      data: null,
    });
  };
}
