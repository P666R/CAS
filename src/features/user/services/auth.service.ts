import { Logger } from '@/global/logging/logger';
import { LoginDTO, SignupDTO } from '../schemas/user.schema';
import { UserRepository } from '../repositories/user.repository';
import { BadRequestError, InternalServerError, UnauthorizedError } from '@/global/errors/custom.error';
import { CurrentUser } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import { env } from '@/global/config/env/env.config';

export class AuthService {
  private readonly logger = Logger.getInstance().createChildLogger({
    service: 'AuthService',
  });

  constructor(private readonly userRepository: UserRepository) {}

  public async signup(requestBody: SignupDTO) {
    const isExistingUser = await this.userRepository.findUserByEmail(requestBody.email);
    if (isExistingUser) {
      this.logger.warn({ email: requestBody.email }, 'User with email already exists');
      throw new BadRequestError('User with email already exists', { email: requestBody.email });
    }

    const newUser = await this.userRepository.createUser(requestBody);
    if (!newUser) {
      this.logger.error({ email: requestBody.email }, 'User not created');
      throw new InternalServerError('User not created', { email: requestBody.email });
    }
    this.logger.info({ userId: newUser.id as string }, 'User signed up successfully');
    return newUser;
  }

  public async login(requestBody: LoginDTO) {
    const user = await this.userRepository.findUserByEmail(requestBody.email);
    if (!user || !(await user.comparePassword(requestBody.password))) {
      this.logger.warn({ email: requestBody.email }, 'Invalid credentials');
      throw new UnauthorizedError('Invalid credentials', { email: requestBody.email });
    }
    this.logger.info({ userId: user.id as string }, 'User logged in successfully');
    return user;
  }

  public generateToken(user: CurrentUser): string {
    return jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
  }

  public verifyToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET) as CurrentUser;
  }
}
