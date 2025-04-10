import { User } from '@/features/user/models/user.model';
import { CreateSignupDTO } from '@/features/user/schemas/user.schema';

export class UserRepository {
  constructor(private readonly userModel: typeof User) {}

  public async createUser(userData: CreateSignupDTO) {
    return this.userModel.create(userData);
  }

  public async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).select('+password');
  }

  public findUserById(id: string) {
    return this.userModel.findById(id);
  }
}
