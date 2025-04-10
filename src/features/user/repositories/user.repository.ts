import { SignupDTO } from '../schemas/user.schema';
import { User } from '@/features/user/models/user.model';

export class UserRepository {
  constructor(private readonly userModel: typeof User) {}

  public async createUser(userData: SignupDTO) {
    return this.userModel.create(userData);
  }

  public async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).select('+password -__v');
  }

  public findUserById(id: string) {
    return this.userModel.findById(id).select('-__v');
  }
}
