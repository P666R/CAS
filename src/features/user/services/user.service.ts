import { Logger } from '@/global/logging/logger';
import { SignupDTO } from '@/features/user/schemas/user.schema';
import { UserRepository } from '@/features/user/repositories/user.repository';
import { BadRequestError, InternalServerError } from '@/global/errors/custom.error';

export class UserService {
  private readonly logger = Logger.getInstance().createChildLogger({
    service: 'UserService',
  });

  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(requestBody: SignupDTO) {
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
    return newUser;
  }

  public async getUserById(id: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      this.logger.warn({ id }, 'User not found');
      throw new BadRequestError('User not found', { id });
    }
    return user;
  }
}
